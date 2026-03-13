import json
import requests

bbox = "(51.98,8.45,52.25,8.90)"

query = f"""
[out:json][timeout:25];
(
  way["highway"="construction"]{bbox};
  node["highway"="construction"]{bbox};
);
out center;
"""

url = "https://overpass-api.de/api/interpreter"

headers = {
"User-Agent": "herford-traffic-map"
}

features=[]

try:

    r = requests.post(url,data=query,headers=headers,timeout=60)

    if r.status_code != 200:
        raise Exception("Overpass error")

    data = r.json()

    for e in data["elements"]:

        if "lat" in e:
            lat = e["lat"]
            lon = e["lon"]
        else:
            lat = e["center"]["lat"]
            lon = e["center"]["lon"]

        features.append({
            "type":"Feature",
            "properties":{
                "title":"Baustelle",
                "type":"baustelle"
            },
            "geometry":{
                "type":"Point",
                "coordinates":[lon,lat]
            }
        })

except Exception as err:
    print("Fehler beim Laden der Baustellen:",err)

geojson = {
"type":"FeatureCollection",
"features":features
}

with open("data/traffic.geojson","w") as f:
    json.dump(geojson,f)
