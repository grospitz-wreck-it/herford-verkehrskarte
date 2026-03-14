import requests
import json

url="GOOGLE_SHEET_JSON_URL"

try:

    r=requests.get(url)
    data=r.json()

    with open("data/editorial.json","w") as f:
        json.dump(data,f)

except:
    pass
