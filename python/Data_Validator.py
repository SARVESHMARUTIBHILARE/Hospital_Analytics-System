"""Validate records returned by the Node.js API."""
from api_client import get_records

RULES = {
    "patients": ["name"],
    "doctors": ["name"],
    "staff": ["name"],
    "appointments": ["patientId", "doctorId"],
}

def validate(resource, records):
    required = RULES.get(resource, [])
    errors = []
    for index, record in enumerate(records, 1):
        for field in required:
            if not record.get(field):
                errors.append(f"{resource} #{index}: missing {field}")
    return errors

def run():
    total_errors = 0
    for resource in RULES:
        records = get_records(resource)
        errors = validate(resource, records)
        total_errors += len(errors)
        for error in errors:
            print("ERROR:", error)
        if not errors:
            print(f"{resource}: OK ({len(records)} records)")
    return total_errors

if __name__ == "__main__":
    raise SystemExit(1 if run() else 0)
