import requests
import json

autobahns=["A2","A30"]

services=[
("roadworks","🚧"),
("closures","⛔"),
("warnings","⚠️"),
("traffic","🚗"),
("webcams","📷"),
("chargingstations","🔌")
]

features=[]

for a in autobahns:

    for service,icon in services:

        url=f"https://verkehr.autobahn.de/o/autobahn/{a}/services/{service}"

        try:

            r=requests.get(url,timeout=30)

            data=r.json()

            items=data.get(service,[])

            for item in items:

                coord=item.get("coordinate")

                if not coord:
                    continue

                lat=coord.get("lat")
                lon=coord.get("long")

                if not lat or not lon:
                    continue

                title=item.get("title","Autobahnmeldung")

                desc=item.get("description","")

                features.append({

                    "type":"Feature",

                    "geometry":{
                        "type":"Point",
                        "coordinates":[lon,lat]
                    },

                    "properties":{
                        "title":title,
                        "description":desc,
                        "icon":icon
                    }

                })

        except Exception as e:

            print("error",service,e)


geo={
"type":"FeatureCollection",
"features":features
}

with open("data/autobahn.json","w") as f:

    json.dump(geo,f)
