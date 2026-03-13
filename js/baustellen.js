
async function loadBaustellen(){

try{

const response = await fetch(
"https://baustellen.strassen.nrw/api"
);

const data = await response.json();

L.geoJSON(data,{
style:{
color:"orange"
}
}).addTo(map);

}catch(e){

console.log("Baustellen konnten nicht geladen werden");

}

}

loadBaustellen();
