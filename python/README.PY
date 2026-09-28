# Python Components

Five Python utilities are included:

1. `analytics.py` — dashboard analytics
2. `mongo_helper.py` — optional direct MongoDB helper
3. `api_client.py` — Node.js REST API client
4. `report_generator.py` — generates a hospital text report
5. `data_validator.py` — validates API records

`requirements.txt` contains the optional PyMongo dependency.

Main architecture:
Microsoft Edge -> Node.js -> MongoDB
Python -> Node.js API / optional MongoDB helper

No SQL or SQLite database is used.
