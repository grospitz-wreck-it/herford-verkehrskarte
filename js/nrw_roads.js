async function loadNRW(){

const url="https://verkehr.nrw/baustellen.json"

try{

const r=await fetch(url)
const data=await r.json()

data.forEach(b=>{

addMarker(
b.lat,
b.lon,
"🚧",
b.title
)

})

}catch(e){

console.log("NRW feed aktuell nicht erreichbar")

}

}

loadNRW()
