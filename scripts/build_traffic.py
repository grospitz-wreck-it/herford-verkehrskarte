import requests, json

query = """
[out:json][timeout:25];
(
  node["highway"="construction"](51.9,8.4,52.3,8.9);
);
out;
"""

url="https://overpass-api.de/api/interpreter"

r=requests.post(url,data=query)
data=r.json()

features=[]

for el in data["elements"]:
    lat=el["lat"]
    lon=el["lon"]

    features.append({
        "type":"Feature",
        "properties":{
            "title":"Baustelle",
            "type":"construction"
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

with open("data/traffic.json","w") as f:
    json.dump(geojson,f)
