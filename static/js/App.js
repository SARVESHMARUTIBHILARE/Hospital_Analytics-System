const API_BASE=(location.port==="5000" || (location.hostname==="127.0.0.1" && !location.port))
  ? "" : "http://127.0.0.1:5000";
let charts={};
const demo={
kpis:{patients:8,admitted:5,doctors:6,staff:6,revenue:130300},
departments:[{department:"Cardiology",count:2},{department:"Neurology",count:1},{department:"Orthopedics",count:1},{department:"General Medicine",count:1},{department:"Pediatrics",count:1},{department:"Emergency",count:1},{department:"Gynecology",count:1}],
statuses:[{status:"Admitted",count:5},{status:"Discharged",count:3}]
};
const demoRows={
patients:[
{id:8,name:"Meera Modi",age:31,gender:"Female",phone:"9876501008",department:"Gynecology",status:"Admitted",admission_date:"2026-09-27",diagnosis:"Routine observation",doctor:"Dr. Riya Joshi",bill:14500},
{id:7,name:"Vivaan Shah",age:45,gender:"Male",department:"Emergency",status:"Discharged",admission_date:"2026-09-25",bill:7900},
{id:6,name:"Isha Patel",age:63,gender:"Female",department:"Cardiology",status:"Admitted",admission_date:"2026-09-20",bill:31200},
{id:5,name:"Kabir Joshi",age:19,gender:"Male",department:"Pediatrics",status:"Admitted",admission_date:"2026-09-26",bill:6800},
{id:4,name:"Anaya Desai",age:41,gender:"Female",department:"General Medicine",status:"Discharged",admission_date:"2026-09-15",bill:9300},
{id:3,name:"Rohan Mehta",age:52,gender:"Male",department:"Orthopedics",status:"Admitted",admission_date:"2026-09-24",bill:22400},
{id:2,name:"Diya Shah",age:27,gender:"Female",department:"Neurology",status:"Discharged",admission_date:"2026-09-18",bill:12700},
{id:1,name:"Aarav Patel",age:34,gender:"Male",department:"Cardiology",status:"Admitted",admission_date:"2026-09-22",bill:18500}],
doctors:[
{id:6,name:"Dr. Riya Joshi",specialty:"Gynecologist",department:"Gynecology",experience:9,patients:78},
{id:5,name:"Dr. Kunal Patel",specialty:"Pediatrician",department:"Pediatrics",experience:7,patients:63},
{id:4,name:"Dr. Priya Desai",specialty:"Physician",department:"General Medicine",experience:8,patients:104},
{id:3,name:"Dr. Arjun Mehta",specialty:"Orthopedic Surgeon",department:"Orthopedics",experience:12,patients:91},
{id:2,name:"Dr. Neha Shah",specialty:"Neurologist",department:"Neurology",experience:10,patients:72},
{id:1,name:"Dr. Raj Malhotra",specialty:"Cardiologist",department:"Cardiology",experience:14,patients:86}],
staff:[
{id:6,name:"Rahul Joshi",role:"Radiology Technician",department:"Radiology",shift:"Day",status:"On Leave"},
{id:5,name:"Kavita Mehta",role:"Nurse",department:"Emergency",shift:"Night",status:"Active"},
{id:4,name:"Nikhil Patel",role:"Pharmacist",department:"Pharmacy",shift:"Night",status:"Active"},
{id:3,name:"Pooja Shah",role:"Receptionist",department:"Administration",shift:"Day",status:"Active"},
{id:2,name:"Amit Kumar",role:"Lab Technician",department:"Diagnostics",shift:"Day",status:"Active"},
{id:1,name:"Sonal Verma",role:"Head Nurse",department:"Cardiology",shift:"Day",status:"Active"}],
appointments:[
{id:4,patient:"Isha Patel",doctor:"Dr. Raj Malhotra",department:"Cardiology",appointment_date:"2026-10-01",status:"Scheduled"},
{id:3,patient:"Rohan Mehta",doctor:"Dr. Arjun Mehta",department:"Orthopedics",appointment_date:"2026-09-30",status:"Scheduled"},
{id:2,patient:"Diya Shah",doctor:"Dr. Neha Shah",department:"Neurology",appointment_date:"2026-09-29",status:"Scheduled"},
{id:1,patient:"Aarav Patel",doctor:"Dr. Raj Malhotra",department:"Cardiology",appointment_date:"2026-09-29",status:"Scheduled"}]
};
const $=s=>document.querySelector(s);
const escapeHtml=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
async function getJson(url){
  try{
    let r=await fetch(API_BASE+url,{cache:"no-store"});
    if(!r.ok) throw Error("HTTP "+r.status);
    return await r.json();
  }catch(e){
    console.error("API GET failed:",url,e);
    return null;
  }
}
document.querySelectorAll(".nav").forEach(b=>b.onclick=()=>showView(b.dataset.view));
$("#refreshBtn").onclick=loadDashboard;
function showView(v){document.querySelectorAll(".nav").forEach(x=>x.classList.toggle("active",x.dataset.view===v));document.querySelectorAll(".view").forEach(x=>x.classList.add("hidden"));$("#"+v).classList.remove("hidden");$("#title").textContent=v[0].toUpperCase()+v.slice(1);if(v!=="dashboard")loadTable(v)}
function tick(){$("#clock").textContent=new Date().toLocaleString([],{dateStyle:"medium",timeStyle:"short"})}setInterval(tick,1000);tick();

async function loadDashboard(){
 let health=await getJson("/api/health");
 let d=await getJson("/api/dashboard");if(!d)d=demo;
 if(health && health.ok){
   const el=document.querySelector(".system-status");
   if(el) el.innerHTML='<span class="status-dot"></span> Node.js + MongoDB connected';
 }
 $("#kpis").innerHTML=[
 ["Total Patients",d.kpis.patients,"Registered records"],["Currently Admitted",d.kpis.admitted,"Active admissions"],
 ["Doctors",d.kpis.doctors,"Clinical specialists"],["Patient Billing","₹"+Number(d.kpis.revenue).toLocaleString("en-IN"),"Recorded bill value"]
 ].map(x=>`<div class="kpi"><small>${x[0]}</small><strong>${x[1]}</strong><em>● ${x[2]}</em></div>`).join("");
 $("#snapshot").innerHTML=[["Departments",d.departments.length],["Doctors",d.kpis.doctors],["Staff",d.kpis.staff],["Appointments","Live"]].map(x=>`<div class="snap"><small>${x[0]}</small><b>${x[1]}</b></div>`).join("");
 renderBarChart(d.departments);
 renderStatusChart(d.statuses);
}

const configs={
patients:{
 cols:["id","name","age","gender","phone","department","status","admission_date","diagnosis","doctor","bill"],
 labels:["ID","Name","Age","Gender","Phone","Department","Status","Admission Date","Diagnosis","Doctor","Bill"],
 fields:[["name","Name","text"],["age","Age","number"],["gender","Gender","select","Male|Female|Other"],["phone","Phone","tel"],["department","Department","text"],["status","Status","select","Admitted|Discharged|Outpatient"],["admission_date","Admission Date","date"],["diagnosis","Diagnosis","text"],["doctor","Doctor","text"],["bill","Bill Amount","number"]]
},
doctors:{
 cols:["id","name","specialty","department","phone","experience","patients","availability"],
 labels:["ID","Name","Specialty","Department","Phone","Experience","Patients","Availability"],
 fields:[["name","Name","text"],["specialty","Specialty","text"],["department","Department","text"],["phone","Phone","tel"],["experience","Experience (yrs)","number"],["patients","Patients Seen","number"],["availability","Availability","select","Available|Busy|On Duty"]]
},
staff:{
 cols:["id","name","role","department","phone","shift","status"],
 labels:["ID","Name","Role","Department","Phone","Shift","Status"],
 fields:[["name","Name","text"],["role","Role","text"],["department","Department","text"],["phone","Phone","tel"],["shift","Shift","select","Day|Night"],["status","Status","select","Active|On Leave"]]
},
appointments:{
 cols:["id","patient","doctor","department","appointment_date","status"],
 labels:["ID","Patient","Doctor","Department","Appointment Date","Status"],
 fields:[["patient","Patient","text"],["doctor","Doctor","text"],["department","Department","text"],["appointment_date","Date","date"],["status","Status","select","Scheduled|Completed|Cancelled"]]
}
};

async function loadTable(type){
 let rows=await getJson("/api/"+type);if(!rows)rows=demoRows[type];
 rows.sort((a,b)=>(Number(a.id)||0)-(Number(b.id)||0));
 let c=configs[type],t=$("#"+type+"Table");
 t.innerHTML="<thead><tr>"+c.labels.map(x=>`<th>${x}</th>`).join("")+"</tr></thead><tbody>"+rows.map(r=>"<tr>"+c.cols.map(k=>`<td>${k==="status"?`<span class="badge">${escapeHtml(r[k])}</span>`:k==="bill"?"₹"+Number(r[k]||0).toLocaleString("en-IN"):escapeHtml(r[k])}</td>`).join("")+"</tr>").join("")+"</tbody>";
}
function openForm(type){
 const c=configs[type];$("#formTitle").textContent="Add "+type.slice(0,-1).replace(/^./,x=>x.toUpperCase());
 $("#form").innerHTML='<div class="formgrid">'+c.fields.map(f=>`<div class="field"><label>${f[1]}</label>${f[2]==="select"?`<select name="${f[0]}">${f[3].split("|").map(v=>`<option>${v}</option>`).join("")}</select>`:`<input name="${f[0]}" type="${f[2]}" required>`}</div>`).join("")+'</div><button class="submit">Save Record</button>';
 $("#modal").classList.remove("hidden");
 $("#form").onsubmit=async e=>{e.preventDefault();let data=Object.fromEntries(new FormData(e.target));let result;
try{
  result=await fetch(API_BASE+"/api/"+type,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(data),cache:"no-store"});
}catch(err){
  console.error("API POST failed:",err);
  toast("Cannot connect to Node.js/MongoDB server. Start START_HOSPITAL_SYSTEM.bat and make sure MongoDB is running.");
  return;
}
let payload=await result.json().catch(()=>({}));
if(!result.ok||payload.ok===false){toast("Save failed: "+(payload.error||("HTTP "+result.status)));return}
closeForm();
toast("Record saved in database. ID: "+payload.id);
await loadTable(type);
await loadDashboard();};
}
function closeForm(){$("#modal").classList.add("hidden")}
function toast(msg){let t=$("#toast");t.textContent=msg;t.classList.add("show");setTimeout(()=>t.classList.remove("show"),2500)}
loadDashboard();

function renderBarChart(items){const max=Math.max(...items.map(x=>x.count),1);$("#deptChart").outerHTML=`<div id="deptChart" class="chart-area bar-chart">${items.map(x=>`<div class="bar-row"><span>${escapeHtml(x.department)}</span><div class="bar-track"><div class="bar-fill" style="width:${(x.count/max)*100}%"></div></div><b>${x.count}</b></div>`).join("")}</div>`;}
function renderStatusChart(items){const total=items.reduce((a,x)=>a+x.count,0)||1;$("#statusChart").outerHTML=`<div id="statusChart" class="chart-area status-chart"><div class="donut"><div class="donut-hole">${total}<small>patients</small></div></div><div class="legend-list">${items.map(x=>`<div><i></i><span>${escapeHtml(x.status)}</span><b>${x.count}</b></div>`).join("")}</div></div>`;}
function downloadCsv(type){window.location.href=API_BASE+"/api/export/"+type;}
