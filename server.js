const http = require("http");
const fs = require("fs");
const path = require("path");
const { MongoClient } = require("mongodb");

const ROOT = __dirname;
const PORT = Number(process.env.PORT || 5000);
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://127.0.0.1:27017";
const DB_NAME = process.env.MONGODB_DB || "medvista_hospital";
const collections = ["patients", "doctors", "staff", "appointments"];
const specs = {
  patients:["name","age","gender","phone","department","status","admission_date","diagnosis","doctor","bill"],
  doctors:["name","specialty","department","phone","experience","patients","availability"],
  staff:["name","role","department","phone","shift","status"],
  appointments:["patient","doctor","department","appointment_date","status"]
};
let client, db;

function json(res,status,body,headers={}) {
  res.writeHead(status,{"Content-Type":"application/json; charset=utf-8",
    "Access-Control-Allow-Origin":"*","Access-Control-Allow-Headers":"Content-Type",
    "Access-Control-Allow-Methods":"GET,POST,OPTIONS",...headers});
  res.end(JSON.stringify(body));
}
function csv(res,rows,name) {
  const cols=rows.length?Object.keys(rows[0]).filter(k=>k!=="_id"):[];
  const q=v=>`"${String(v??"").replaceAll('"','""')}"`;
  const lines=[cols.map(q).join(",")];
  for(const row of rows) lines.push(cols.map(k=>q(row[k])).join(","));
  res.writeHead(200,{"Content-Type":"text/csv; charset=utf-8",
    "Content-Disposition":`attachment; filename=${name}.csv`,"Access-Control-Allow-Origin":"*"});
  res.end(lines.join("\r\n"));
}
async function getRows(table){return db.collection(table).find({}, {projection:{_id:0}}).sort({id:1}).toArray();}
async function nextId(table){const last=await db.collection(table).findOne({}, {sort:{id:-1},projection:{id:1}});return (last?.id||0)+1;}
function readBody(req){return new Promise((resolve,reject)=>{let data="";req.on("data",c=>{data+=c;if(data.length>1000000)reject(new Error("Request body too large"));});req.on("end",()=>{try{resolve(JSON.parse(data||"{}"));}catch{reject(new Error("Invalid JSON"));}});req.on("error",reject);});}
async function seed(){
  for(const table of collections){
    const c=db.collection(table); if(await c.countDocuments()>0) continue;
    const file=path.join(ROOT,"data",`${table}.json`); if(!fs.existsSync(file)) continue;
    const rows=JSON.parse(fs.readFileSync(file,"utf8")); if(rows.length) await c.insertMany(rows.map(r=>({...r})));
  }
}
function serveStatic(req,res){
  let urlPath=new URL(req.url,`http://${req.headers.host}`).pathname;
  if(urlPath==="/") urlPath="/index.html";
  const safe=path.normalize(urlPath).replace(/^(\.\.[/\\])+/, "");
  const file=path.join(ROOT,safe); if(!file.startsWith(ROOT)) return res.writeHead(403).end("Forbidden");
  const types={".html":"text/html; charset=utf-8",".css":"text/css; charset=utf-8",".js":"application/javascript; charset=utf-8",
    ".json":"application/json; charset=utf-8",".png":"image/png",".jpg":"image/jpeg",".jpeg":"image/jpeg",".svg":"image/svg+xml"};
  fs.readFile(file,(err,data)=>{if(err)return res.writeHead(404).end("Not found");res.writeHead(200,{"Content-Type":types[path.extname(file).toLowerCase()]||"application/octet-stream"});res.end(data);});
}
async function handle(req,res){
  if(req.method==="OPTIONS") return json(res,204,{});
  const p=new URL(req.url,`http://${req.headers.host}`).pathname;
  if(p==="/api/health"&&req.method==="GET") return json(res,200,{ok:true,version:"4.0-NODE-MONGODB",database:DB_NAME,message:"MongoDB database is active"});
  if(p==="/api/dashboard"&&req.method==="GET"){
    const patients=db.collection("patients");
    const [pc,a,dc,sc,rev,deps,sts]=await Promise.all([
      patients.countDocuments(),patients.countDocuments({status:"Admitted"}),db.collection("doctors").countDocuments(),
      db.collection("staff").countDocuments(),
      patients.aggregate([{$group:{_id:null,total:{$sum:{$convert:{input:"$bill",to:"double",onError:0,onNull:0}}}}}]).toArray(),
      patients.aggregate([{$group:{_id:"$department",count:{$sum:1}}},{$sort:{count:-1}}]).toArray(),
      patients.aggregate([{$group:{_id:"$status",count:{$sum:1}}},{$sort:{_id:1}}]).toArray()
    ]);
    return json(res,200,{kpis:{patients:pc,admitted:a,doctors:dc,staff:sc,revenue:rev[0]?.total||0},
      departments:deps.map(x=>({department:x._id,count:x.count})),statuses:sts.map(x=>({status:x._id,count:x.count}))});
  }
  if(p.startsWith("/api/export/")&&req.method==="GET"){const table=p.split("/").pop();if(!collections.includes(table))return json(res,404,{error:"Unknown collection"});return csv(res,await getRows(table),table);}
  if(p.startsWith("/api/")&&req.method==="GET"){const table=p.split("/").pop();if(collections.includes(table))return json(res,200,await getRows(table));}
  if(p.startsWith("/api/")&&req.method==="POST"){
    const table=p.split("/").pop(); if(collections.includes(table)){
      try{
        const body=await readBody(req), cols=specs[table], record={id:await nextId(table)};
        for(const col of cols){let v=body[col];if(["age","experience","patients"].includes(col))v=v===""||v==null?0:Number(v);if(col==="bill")v=v===""||v==null?0:Number(v);record[col]=v;}
        await db.collection(table).insertOne(record);
        return json(res,200,{ok:true,id:record.id,message:"Saved permanently in MongoDB"});
      }catch(e){return json(res,400,{ok:false,error:e.message});}
    }
  }
  serveStatic(req,res);
}
async function start(){
  client=new MongoClient(MONGODB_URI);await client.connect();db=client.db(DB_NAME);await seed();
  http.createServer((req,res)=>handle(req,res).catch(e=>{console.error(e);json(res,500,{ok:false,error:"Server error: "+e.message});}))
    .listen(PORT,"127.0.0.1",()=>console.log(`MedVista: http://127.0.0.1:${PORT}\nMongoDB: ${MONGODB_URI}/${DB_NAME}`));
}
start().catch(e=>{console.error("\nMongoDB connection failed:",e.message);console.error("Start MongoDB or set MONGODB_URI.");process.exit(1);});
