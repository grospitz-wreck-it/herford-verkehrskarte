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

url = "https://overpass-api.de/api/interpreter"

features = []

try:

    r = requests.post(url, data=query, timeout=60)

    if r.status_code != 200:
        raise Exception("Overpass returned status "+str(r.status_code))

    data = r.json()

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
                "title":"Baustelle",
                "icon":"🚧"
            }
        })

except Exception as e:

    print("Traffic fetch failed:", e)

geo = {
    "type":"FeatureCollection",
    "features":features
}

with open("data/traffic.json","w") as f:
    json.dump(geo,f)
