import requests
import json

autobahns=["A2","A30"]

features=[]

for a in autobahns:

    url=f"https://verkehr.autobahn.de/o/autobahn/{a}/services/traffic"

    try:

        r=requests.get(url,timeout=30)

        data=r.json()

        items=data.get("traffic",[])

        for item in items:

            if not item.get("coordinate"):
                continue

            lat=item["coordinate"]["lat"]
            lon=item["coordinate"]["long"]

            severity=item.get("severity","low")

            color="#2ecc71"

            if severity=="medium":
                color="#f1c40f"

            if severity=="high":
                color="#e74c3c"

            features.append({

                "type":"Feature",

                "geometry":{
                    "type":"LineString",
                    "coordinates":[
                        [lon-0.01,lat],
                        [lon+0.01,lat]
                    ]
                },

                "properties":{
                    "color":color,
                    "title":item.get("title","Stau")
                }

            })

    except:

        print("traffic failed",a)


geo={
"type":"FeatureCollection",
"features":features
}

with open("data/autobahn_lines.json","w") as f:

    json.dump(geo,f)
