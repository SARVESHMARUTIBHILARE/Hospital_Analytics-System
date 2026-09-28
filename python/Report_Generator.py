"""Generate a text hospital summary from the Node.js API."""
from datetime import datetime
from api_client import get_records

def generate_report():
    patients = get_records("patients")
    doctors = get_records("doctors")
    staff = get_records("staff")
    appointments = get_records("appointments")

    lines = [
        "MEDVISTA HOSPITAL REPORT",
        "=" * 30,
        f"Generated: {datetime.now():%Y-%m-%d %H:%M:%S}",
        "",
        f"Patients:      {len(patients)}",
        f"Doctors:       {len(doctors)}",
        f"Staff:         {len(staff)}",
        f"Appointments:  {len(appointments)}",
    ]
    return "\n".join(lines)

if __name__ == "__main__":
    report = generate_report()
    print(report)
    with open("hospital_report.txt", "w", encoding="utf-8") as f:
        f.write(report + "\n")
