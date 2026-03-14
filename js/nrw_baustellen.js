async function loadNRWBaustellen(){

const url="https://www.mobilitaetsdaten.nrw/api/traffic/baustellen"

const r=await fetch(url)
const data=await r.json()

data.features.forEach(f=>{

const lat=f.geometry.coordinates[1]
const lon=f.geometry.coordinates[0]

addMarker(
lat,
lon,
"🚧",
f.properties.description || "Baustelle NRW"
)

})

}

loadNRWBaustellen()
