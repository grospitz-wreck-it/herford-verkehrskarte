async function loadTraffic(){

const r=await fetch("data/traffic.json")
const data=await r.json()

data.features.forEach(f=>{

addMarker(
f.geometry.coordinates[1],
f.geometry.coordinates[0],
"⚠️",
f.properties.title
)

})

}

loadTraffic()
