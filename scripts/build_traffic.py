import json
import requests
import xml.etree.ElementTree as ET

bbox = {
"minLat":51.98,
"maxLat":52.25,
"minLon":8.45,
"maxLon":8.90
}

def in_herford(lat,lon):
    return (
        lat > bbox["minLat"] and
        lat < bbox["maxLat"] and
        lon > bbox["minLon"] and
        lon < bbox["maxLon"]
    )

features=[]

# Autobahn API
try:
    r=requests.get("https://verkehr.autobahn.de/o/autobahn")
    data=r.json()

    for road in data["roads"]:
        if "events" not in road:
            continue

        for e in road["events"]:

            lat=e.get("latitude")
            lon=e.get("longitude")

            if not lat or not lon:
                continue

            if not in_herford(lat,lon):
                continue

            text=e.get("description","Verkehrsmeldung")

            typ="gefahr"

            if "unfall" in text.lower():
                typ="unfall"
            elif "baustelle" in text.lower():
                typ="baustelle"

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
except:
    pass

# Polizei RSS
try:
    rss=requests.get("https://www.presseportal.de/rss/polizei/nordrhein-westfalen").text
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
except:
    pass

geojson={
"type":"FeatureCollection",
"features":features
}

with open("data/traffic.geojson","w") as f:
    json.dump(geojson,f)
