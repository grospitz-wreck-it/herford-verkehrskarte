async function loadOSM(){

const query=`

[out:json][timeout:25];

(
node["highway"="construction"](52.05,8.45,52.25,8.85);
way["highway"="construction"](52.05,8.45,52.25,8.85);
);

out center;

`

const r = await fetch(
"https://overpass-api.de/api/interpreter",
{
method:"POST",
body:query
})

const data = await r.json()

data.elements.forEach(el=>{

let lat=el.lat
let lon=el.lon

if(el.center){
lat=el.center.lat
lon=el.center.lon
}

addMarker(
lat,
lon,
"🚧",
"Baustelle (OpenStreetMap)"
)

})

}

loadOSM()
