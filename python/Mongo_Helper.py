"""MongoDB helper for optional Python-side data operations.

The main application still uses Node.js for database access.
This module requires pymongo if you want to use it directly.
"""
import os

try:
    from pymongo import MongoClient
except ImportError:
    MongoClient = None

MONGO_URI = os.getenv("MONGO_URI", "mongodb://localhost:27017")
DB_NAME = os.getenv("MONGO_DB", "medvista")

def get_database():
    if MongoClient is None:
        raise RuntimeError("Install PyMongo with: pip install pymongo")
    client = MongoClient(MONGO_URI)
    return client[DB_NAME]

def collection(name):
    return get_database()[name]

if __name__ == "__main__":
    db = get_database()
    print("Connected to MongoDB:", db.name)
