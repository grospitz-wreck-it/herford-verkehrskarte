import requests
import json

features=[]


# ---------------------------
# 1 OSM Baustellen (Overpass)
# ---------------------------

query="""
[out:json][timeout:25];
(
node["highway"="construction"](52.05,8.45,52.25,8.85);
way["highway"="construction"](52.05,8.45,52.25,8.85);
);
out center;
"""

try:

    r=requests.post(
        "https://overpass-api.de/api/interpreter",
        data=query,
        timeout=60
    )

    data=r.json()

    for el in data["elements"]:

        if "lat" in el:
            lat=el["lat"]
            lon=el["lon"]
        else:
            lat=el["center"]["lat"]
            lon=el["center"]["lon"]

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

except:
    print("OSM fetch failed")


# ---------------------------
# 2 NRW Verkehrsmeldungen
# ---------------------------

try:

    url="https://www.verkehr.nrw/api/traffic/messages"

    r=requests.get(url,timeout=30)

    data=r.json()

    for m in data["messages"]:

        if not m.get("coordinate"):
            continue

        lat=m["coordinate"]["latitude"]
        lon=m["coordinate"]["longitude"]

        text=m.get("message","Verkehrsmeldung")

        features.append({

            "type":"Feature",
            "geometry":{
                "type":"Point",
                "coordinates":[lon,lat]
            },

            "properties":{
                "title":text,
                "icon":"⚠️"
            }

        })

except:

    print("NRW traffic fetch failed")


# ---------------------------
# speichern
# ---------------------------

geo={
"type":"FeatureCollection",
"features":features
}

with open("data/traffic.json","w") as f:
    json.dump(geo,f)
