import json
import requests
import xml.etree.ElementTree as ET

features=[]

bbox="(51.98,8.45,52.25,8.90)"

headers={"User-Agent":"herford-traffic-map"}

# -----------------------------
# Baustellen aus OpenStreetMap
# -----------------------------

try:

    query=f"""
    [out:json][timeout:25];
    (
      way["highway"="construction"]{bbox};
      node["highway"="construction"]{bbox};
    );
    out center;
    """

    r=requests.post(
        "https://overpass-api.de/api/interpreter",
        data=query,
        headers=headers
    )

    data=r.json()

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

except Exception as err:
    print("OSM Fehler:",err)


# -----------------------------
# Autobahnmeldungen
# -----------------------------

try:

    r=requests.get(
        "https://verkehr.autobahn.de/o/autobahn",
        headers=headers
    )

    data=r.json()

    for road in data["roads"]:

        if "events" not in road:
            continue

        for e in road["events"]:

            lat=e.get("latitude")
            lon=e.get("longitude")

            if not lat or not lon:
                continue

            if not (51.98 < lat < 52.25 and 8.45 < lon < 8.90):
                continue

            text=e.get("description","Verkehrsmeldung")

            typ="gefahr"

            if "unfall" in text.lower():
                typ="unfall"

            features.append({
                "type":"Feature",
                "properties":{
                    "title":text,
                    "type":typ
                },
                "geometry":{
                    "type":"Point",
                    "coordinates":[lon,lat]
                }
            })

except Exception as err:
    print("Autobahn Fehler:",err)


# -----------------------------
# Polizei RSS
# -----------------------------

try:

    rss=requests.get(
        "https://www.presseportal.de/rss/polizei/nordrhein-westfalen"
    ).text

    root=ET.fromstring(rss)

    for item in root.findall(".//item"):

        title=item.find("title").text

        if "Herford" in title or "Bünde" in title or "Löhne" in title:

            features.append({
                "type":"Feature",
                "properties":{
                    "title":title,
                    "type":"gefahr"
                },
                "geometry":{
                    "type":"Point",
                    "coordinates":[8.67,52.11]
                }
            })

except Exception as err:
    print("Polizei RSS Fehler:",err)


geojson={
"type":"FeatureCollection",
"features":features
}

with open("data/traffic.geojson","w") as f:
    json.dump(geojson,f)

print("Meldungen:",len(features))
