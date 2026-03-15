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

                if not item.get("coordinate"):
                    continue

                lat=item["coordinate"]["lat"]
                lon=item["coordinate"]["long"]

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
                        "icon":icon,
                        "type":service
                    }

                })

        except:

            print("error",a,service)


geo={
"type":"FeatureCollection",
"features":features
}

with open("data/autobahn.json","w") as f:

    json.dump(geo,f)
