import requests
import json

features=[]
seen=set()

def add_feature(lat,lon,title,icon):

    key=f"{lat}-{lon}"

    if key in seen:
        return

    seen.add(key)

    features.append({

        "type":"Feature",

        "geometry":{
            "type":"Point",
            "coordinates":[lon,lat]
        },

        "properties":{
            "title":title,
            "icon":icon
        }

    })


# -------------------------
# Autobahn API
# -------------------------

autobahns=["A2","A30"]

services=[
("roadworks","🚧"),
("closures","⛔"),
("warnings","⚠️"),
("traffic","🚗")
]

for a in autobahns:

    for service,icon in services:

        try:

            url=f"https://verkehr.autobahn.de/o/autobahn/{a}/services/{service}"

            r=requests.get(url,timeout=30)

            data=r.json()

            items=data.get(service,[])

            for item in items:

                coord=item.get("coordinate")

                if not coord:
                    continue

                lat=coord.get("lat")
                lon=coord.get("long")

                title=item.get("title","Autobahnmeldung")

                add_feature(lat,lon,title,icon)

        except:
            print("Autobahn API failed")


# -------------------------
# OSM Baustellen
# -------------------------

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

        add_feature(lat,lon,"Baustelle","🚧")

except:

    print("OSM failed")


# -------------------------
# speichern
# -------------------------

geo={
"type":"FeatureCollection",
"features":features
}

with open("data/traffic.json","w") as f:

    json.dump(geo,f)
