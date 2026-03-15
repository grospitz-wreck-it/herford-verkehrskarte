async function loadAutobahn(){

const r=await fetch("data/autobahn.json")

const data=await r.json()

data.features.forEach(f=>{

const lat=f.geometry.coordinates[1]
const lon=f.geometry.coordinates[0]

const icon=f.properties.icon

const text=
"<b>"+f.properties.title+"</b><br>"+f.properties.description

addMarker(lat,lon,icon,text)

})

}

loadAutobahn()
