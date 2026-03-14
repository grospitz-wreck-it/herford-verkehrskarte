import json

data={
"type":"FeatureCollection",
"features":[
{
"type":"Feature",
"geometry":{"type":"Point","coordinates":[8.673,52.114]},
"properties":{"title":"Baustelle Herford Innenstadt","type":"construction"}
}
]
}

with open("data/traffic.json","w") as f:
 json.dump(data,f)
