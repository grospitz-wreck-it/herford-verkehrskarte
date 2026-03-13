import json
import requests

overpass_query = """
[out:json][timeout:25];
(
  way["highway"="construction"](51.98,8.45,52.25,8.90);
  node["highway"="construction"](51.98,8.45,52.25,8.90);
);
out center;
"""

url = "https://overpass-api.de/api/interpreter"

r = requests.post(url,data=overpass_query)

data = r.json()

features=[]

for e in data["elements"]:

    if "lat" in e:
        lat=e["lat"]
        lon=e["lon"]
    else:
        lat=e["center"]["lat"]
        lon=e["center"]["lon"]

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

geojson={
"type":"FeatureCollection",
"features":features
}

with open("data/traffic.geojson","w") as f:
    json.dump(geojson,f)
