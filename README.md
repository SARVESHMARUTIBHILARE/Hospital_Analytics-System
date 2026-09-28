# 🏥 Hospital Analytics System

A modern and interactive **Hospital Analytics System** designed to manage hospital information and visualize important healthcare data through an easy-to-use web dashboard.

The system uses **HTML, CSS, JavaScript, Node.js, MongoDB, and Python**. Node.js acts as the main backend, MongoDB stores application data, and Python provides additional analytics, reporting, and data-validation capabilities.

---
## 📸 Screenshots

### Hospital Analytics System

| Screenshot 1 | Screenshot 2 |
|:---:|:---:|
| <img src="Images/sa1.png" alt="Hospital Dashboard" width="100%"> | <img src="Images/sa2.png" alt="Hospital Dashboard Analytics" width="100%"> |
| **Dashboard** | **Dashboard Analytics** |

| Screenshot 3 | Screenshot 4 |
|:---:|:---:|
| <img src="Images/sa3.png" alt="Patients Management" width="100%"> | <img src="Images/sa4.png" alt="Doctors Management" width="100%"> |
| **Patients Management** | **Doctors Management** |

| Screenshot 5 | Screenshot 6 |
|:---:|:---:|
| <img src="Images/sa5.png" alt="Staff Management" width="100%"> | <img src="Images/sa6.png" alt="Appointments Management" width="100%"> |
| **Staff Management** | **Appointments Management** |

| Screenshot 7 | Screenshot 8 |
|:---:|:---:|
| <img src="Images/sa7.png" alt="Patient Analytics" width="100%"> | <img src="Images/sa8.png" alt="Hospital Statistics" width="100%"> |
| **Patient Analytics** | **Hospital Statistics** |

| Screenshot 9 | Screenshot 10 |
|:---:|:---:|
| <img src="Images/sa9.png" alt="MongoDB Data" width="100%"> | <img src="Images/sa10.png" alt="Hospital Operations" width="100%"> |
| **MongoDB Data** | **Hospital Operations** |
## 📌 Project Overview

The **Hospital Analytics System** helps manage and analyze hospital-related information such as:

* 👨‍⚕️ Doctors
* 🧑‍🤝‍🧑 Patients
* 👩‍💼 Staff Members
* 📅 Appointments
* 📊 Hospital Analytics
* 📈 Dashboard Statistics
* 📄 Reports
* ✅ Data Validation

The system provides a centralized dashboard where hospital data can be viewed and analyzed efficiently.

---

## 🚀 Features

### 📊 Hospital Dashboard

* Total number of patients
* Total number of doctors
* Total staff members
* Total appointments
* Appointment status statistics
* Interactive analytics
* Real-time data loading

### 👨‍⚕️ Doctor Management

* Add doctors
* View doctor information
* Store doctor details
* Manage doctor records
* Connect doctors with appointments

### 🧑‍🤝‍🧑 Patient Management

* Add patients
* View patient records
* Store patient information
* Manage patient IDs
* Maintain patient data through MongoDB

### 👩‍💼 Staff Management

* Add staff members
* View staff records
* Store staff information
* Manage staff IDs and details

### 📅 Appointment Management

* Create appointments
* Store patient and doctor relationships
* Track appointment status
* View appointment information

### 📈 Analytics

The system provides analytics for:

* Patient count
* Doctor count
* Staff count
* Appointment count
* Appointment status
* Hospital activity

### 🐍 Python Analytics

Python is included for additional:

* Hospital analytics
* Data validation
* Report generation
* API communication
* Optional MongoDB operations

---

# 🛠️ Technologies Used

| Technology     | Purpose                            |
| -------------- | ---------------------------------- |
| HTML5          | Website structure                  |
| CSS3           | Website styling                    |
| JavaScript     | Frontend functionality             |
| Node.js        | Backend server                     |
| Express.js     | REST API                           |
| MongoDB        | Database                           |
| Python         | Analytics and reporting            |
| PyMongo        | Optional Python MongoDB connection |
| Microsoft Edge | Web browser                        |

---

# 🏗️ System Architecture

```text
                    ┌─────────────────────┐
                    │   Microsoft Edge     │
                    │     Web Browser      │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │    HTML / CSS / JS  │
                    │     Frontend UI     │
                    └──────────┬──────────┘
                               │
                               ▼
                    ┌─────────────────────┐
                    │      Node.js        │
                    │    Express Server   │
                    └──────────┬──────────┘
                               │
                ┌──────────────┴──────────────┐
                ▼                             ▼
       ┌─────────────────┐          ┌─────────────────┐
       │     MongoDB     │          │     Python      │
       │    Database     │          │    Analytics    │
       └─────────────────┘          └─────────────────┘
```

---

# 📁 Project Structure

```text
Hospital-Analytics-System/
│
├── index.html
├── server.js
├── package.json
├── README.md
├── PROJECT_INFO.txt
├── .env.example
├── .gitignore
│
├── START_HOSPITAL_SYSTEM.bat
├── START_MEDVISTA_ALL.bat
│
├── data/
│   ├── patients.json
│   ├── doctors.json
│   ├── staff.json
│   └── appointments.json
│
├── static/
│   ├── css/
│   │   └── style.css
│   │
│   └── js/
│       └── app.js
│
└── python/
    ├── analytics.py
    ├── mongo_helper.py
    ├── api_client.py
    ├── report_generator.py
    ├── data_validator.py
    ├── requirements.txt
    └── README.md
```

---

# 🗄️ Database

The project uses **MongoDB** as the main database.

### Collections

```text
patients
doctors
staff
appointments
```

MongoDB provides persistent storage for the hospital application.

### Example Patient Document

```json
{
  "id": 1,
  "name": "Rahul Sharma",
  "age": 35,
  "gender": "Male",
  "department": "Cardiology"
}
```

---

# 🟢 Node.js Backend

Node.js is responsible for:

* Starting the web server
* Providing REST APIs
* Connecting to MongoDB
* Saving records
* Fetching records
* Updating records
* Managing hospital data

Example API structure:

```text
GET    /api/patients
GET    /api/doctors
GET    /api/staff
GET    /api/appointments

POST   /api/patients
POST   /api/doctors
POST   /api/staff
POST   /api/appointments
```

---

# 🐍 Python Components

The project contains five Python utilities.

## 1. analytics.py

Provides hospital analytics such as:

```text
Total Patients
Total Doctors
Total Staff
Total Appointments
Appointment Status
```

Run:

```bash
python python/analytics.py
```

---

## 2. mongo_helper.py

Provides an optional Python interface for MongoDB.

Install PyMongo:

```bash
pip install pymongo
```

Run:

```bash
python python/mongo_helper.py
```

---

## 3. api_client.py

Connects Python to the Node.js REST API.

Run:

```bash
python python/api_client.py
```

---

## 4. report_generator.py

Generates a hospital summary report.

Run:

```bash
python python/report_generator.py
```

The generated report is saved as:

```text
hospital_report.txt
```

---

## 5. data_validator.py

Checks hospital records for missing required information.

Run:

```bash
python python/data_validator.py
```

---

# ⚙️ Installation

## Step 1 — Install Node.js

Install Node.js on your computer.

Check installation:

```bash
node --version
npm --version
```

---

## Step 2 — Install MongoDB

Install MongoDB Community Server and make sure MongoDB is running.

Default MongoDB address:

```text
mongodb://localhost:27017
```

---

## Step 3 — Install Project Dependencies

Open the project folder in Command Prompt or VS Code.

Run:

```bash
npm install
```

---

## Step 4 — Start Node.js Backend

Run:

```bash
npm start
```

The application will normally be available at:

```text
http://localhost:5000
```

---

# 🐍 Python Setup

Install Python 3.9 or newer.

Check:

```bash
python --version
```

Install Python dependencies:

```bash
pip install -r python/requirements.txt
```

---

# ▶️ Run the Complete System

### Option 1 — Automatic Startup

Double-click:

```text
START_MEDVISTA_ALL.bat
```

This starts:

```text
Node.js
   ↓
MongoDB connection
   ↓
Python Analytics
   ↓
Microsoft Edge
```

---

### Option 2 — Manual Startup

Start MongoDB first.

Then:

```bash
npm install
npm start
```

Open Microsoft Edge:

```text
http://localhost:5000
```

For Python analytics:

```bash
python python/analytics.py
```

---

# 📊 Analytics Dashboard

The dashboard can display information such as:

```text
┌──────────────────────────────────────┐
│       HOSPITAL ANALYTICS             │
├──────────────────────────────────────┤
│                                      │
│ Patients       Doctors      Staff    │
│   150             25          40     │
│                                      │
│        Appointments: 320             │
│                                      │
│       📊 Appointment Analytics       │
│       📈 Hospital Statistics         │
│                                      │
└──────────────────────────────────────┘
```

---

# 🔄 Data Flow

```text
User
  ↓
Microsoft Edge
  ↓
HTML / CSS / JavaScript
  ↓
Node.js / Express API
  ↓
MongoDB
  ↓
Hospital Data
  ↓
Dashboard
```

Python can additionally consume the Node.js API:

```text
Node.js API
     ↓
Python
     ↓
Analytics
     ↓
Reports / Validation
```

---

# 🔐 Data Storage

The system stores data in MongoDB rather than SQL or SQLite.

```text
❌ SQL Database
❌ SQLite Database

✅ MongoDB
✅ Node.js Backend
✅ Python Analytics
```

---

# 📈 Future Improvements

Possible future features include:

* 🔐 User authentication
* 👨‍⚕️ Doctor login
* 🧑‍🤝‍🧑 Patient portal
* 📅 Appointment calendar
* 💊 Pharmacy management
* 🧪 Laboratory management
* 💳 Billing management
* 🏥 Multiple hospital branches
* 📊 Advanced analytics
* 📄 PDF reports
* 📧 Email notifications
* 📱 Mobile application
* ☁️ Cloud MongoDB deployment
* 🔒 Role-based access control

---

# 🎯 Project Objectives

The main objectives of the Hospital Analytics System are:

1. Manage hospital records digitally.
2. Store hospital information using MongoDB.
3. Provide a user-friendly dashboard.
4. Reduce manual data management.
5. Analyze hospital statistics.
6. Generate useful reports.
7. Validate hospital records.
8. Provide a scalable Node.js backend.
9. Use Python for additional analytics.
10. Provide an easy-to-use hospital management platform.

---

# 👨‍💻 Project Type

**Project:** Hospital Analytics System

**Category:** Healthcare / Hospital Management

**Frontend:** HTML, CSS, JavaScript

**Backend:** Node.js + Express.js

**Database:** MongoDB

**Analytics:** Python

**Browser:** Microsoft Edge

---
### 👨‍💻 Developer
Your Name:Bhilare Sarvesh Maruti Bhilare
### 🔗 GitHub: https://github.com/SARVESHMARUTIBHILARE


### 👨‍💻 Team Members
Your Name:Taufeek Khan
### 🔗 GitHub: https://github.com/taufeekkhan717-star
# 📜 License

This project is intended for educational and project-development purposes.

---

# ⭐ Conclusion

The **Hospital Analytics System** combines a modern web frontend with a Node.js backend, MongoDB database, and Python analytics tools.

It provides a practical platform for managing **patients, doctors, staff, appointments, and hospital analytics** while maintaining a clean and scalable architecture.
