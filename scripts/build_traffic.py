import json

data={
"type":"FeatureCollection",
"features":[]
}

with open("data/traffic.json","w") as f:
 json.dump(data,f)
