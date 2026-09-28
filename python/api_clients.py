"""Simple Python client for the MedVista Node.js REST API."""
import json
import urllib.request

BASE_URL = "http://localhost:5000/api"

def get_records(resource):
    with urllib.request.urlopen(f"{BASE_URL}/{resource}", timeout=5) as response:
        return json.loads(response.read().decode("utf-8"))

def show_counts():
    for resource in ("patients", "doctors", "staff", "appointments"):
        try:
            print(f"{resource}: {len(get_records(resource))}")
        except Exception as exc:
            print(f"{resource}: unavailable ({exc})")

if __name__ == "__main__":
    show_counts()
