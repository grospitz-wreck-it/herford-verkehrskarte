
import json
import requests

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

features = []

try:
    r = requests.get("https://verkehr.autobahn.de/o/autobahn")
    data = r.json()

    for road in data["roads"]:
        if "events" not in road:
            continue

        for e in road["events"]:

            lat = e.get("latitude")
            lon = e.get("longitude")

            if not lat or not lon:
                continue

            if not in_herford(lat,lon):
                continue

            text = e.get("description","Verkehrsmeldung")

            typ = "gefahr"

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

geojson = {
"type":"FeatureCollection",
"features":features
}

with open("data/traffic.geojson","w") as f:
    json.dump(geojson,f)
