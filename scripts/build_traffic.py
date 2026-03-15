import requests
import json
from shapely.geometry import Point, shape

# --------------------------------
# Kreisgrenze laden
# --------------------------------

with open("data/kreis-herford.geojson") as f:
    kreis_geo = json.load(f)

kreis = shape(kreis_geo["features"][0]["geometry"])

features = []
seen = set()


def inside_kreis(lat, lon):

    p = Point(lon, lat)
    return kreis.contains(p)


# --------------------------------
# 1 OSM Baustellen
# --------------------------------

query = """
[out:json][timeout:25];

(
node["highway"="construction"](52.05,8.45,52.25,8.85);
way["highway"="construction"](52.05,8.45,52.25,8.85);
);

out center;
"""

try:

    r = requests.post(
        "https://overpass-api.de/api/interpreter",
        data=query,
        timeout=60
    )

    data = r.json()

    for el in data["elements"]:

        if "lat" in el:
            lat = el["lat"]
            lon = el["lon"]
        else:
            lat = el["center"]["lat"]
            lon = el["center"]["lon"]

        if not inside_kreis(lat,lon):
            continue

        key = f"{lat}-{lon}"

        if key in seen:
            continue

        seen.add(key)

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

    print("OSM failed")


# --------------------------------
# 2 NRW Verkehrsmeldungen
# --------------------------------

try:

    url = "https://www.verkehr.nrw/api/traffic/messages"

    r = requests.get(url,timeout=30)

    data = r.json()

    for m in data["messages"]:

        if not m.get("coordinate"):
            continue

        lat = m["coordinate"]["latitude"]
        lon = m["coordinate"]["longitude"]

        if not inside_kreis(lat,lon):
            continue

        text = m.get("message","Verkehrsmeldung")

        key = f"{lat}-{lon}"

        if key in seen:
            continue

        seen.add(key)

        icon="⚠️"

        if "Stau" in text:
            icon="🚗"

        if "Baustelle" in text:
            icon="🚧"

        features.append({

            "type":"Feature",

            "geometry":{
                "type":"Point",
                "coordinates":[lon,lat]
            },

            "properties":{
                "title":text,
                "icon":icon
            }

        })

except:

    print("NRW traffic failed")


# --------------------------------
# speichern
# --------------------------------

geo = {
"type":"FeatureCollection",
"features":features
}

with open("data/traffic.json","w") as f:
    json.dump(geo,f)
