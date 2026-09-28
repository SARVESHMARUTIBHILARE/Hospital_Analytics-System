"""Hospital analytics service using the Node.js API."""
import json
import urllib.request
from collections import Counter

NODE_API = "http://localhost:5000/api"

def fetch(endpoint):
    with urllib.request.urlopen(f"{NODE_API}/{endpoint}", timeout=5) as r:
        return json.loads(r.read().decode())

def build_report():
    patients = fetch("patients")
    doctors = fetch("doctors")
    staff = fetch("staff")
    appointments = fetch("appointments")
    return {
        "patients": len(patients),
        "doctors": len(doctors),
        "staff": len(staff),
        "appointments": len(appointments),
        "appointment_status": dict(
            Counter(str(x.get("status", "Unknown")) for x in appointments)
        )
    }

if __name__ == "__main__":
    print(json.dumps(build_report(), indent=2))
