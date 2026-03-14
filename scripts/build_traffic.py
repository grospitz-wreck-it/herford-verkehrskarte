import requests
import json

query = """
[out:json][timeout:25];

(
node["highway"="construction"](52.05,8.45,52.25,8.85);
way["highway"="construction"](52.05,8.45,52.25,8.85);
);

out center;
"""

r = requests.post(
    "https://overpass-api.de/api/interpreter",
    data=query
)

data = r.json()

features = []

for el in data["elements"]:

    if "lat" in el:
        lat = el["lat"]
        lon = el["lon"]
    else:
        lat = el["center"]["lat"]
        lon = el["center"]["lon"]

    features.append({
        "type":"Feature",
        "geometry":{
            "type":"Point",
            "coordinates":[lon,lat]
        },
        "properties":{
            "title":"Baustelle"
        }
    })

geojson = {
    "type":"FeatureCollection",
    "features":features
}

with open("data/traffic.json","w") as f:
    json.dump(geojson,f)
