import requests, json

features=[]


# Baustellen aus OpenStreetMap
query="""
[out:json][timeout:25];
(
 node["highway"="construction"](51.9,8.4,52.3,8.9);
 way["highway"="construction"](51.9,8.4,52.3,8.9);
);
out center;
"""

url="https://overpass-api.de/api/interpreter"

try:
    r=requests.post(url,data=query,timeout=30)
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
        "properties":{
        "title":"Baustelle",
        "type":"construction"
        },
        "geometry":{
        "type":"Point",
        "coordinates":[lon,lat]
        }
        })

except:
    pass



geojson={
"type":"FeatureCollection",
"features":features
}

with open("data/traffic.json","w") as f:
    json.dump(geojson,f)
