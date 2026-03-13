let trafficLayer;

let stats = {
baustellen:0,
unfaelle:0,
gefahren:0
};

const HERFORD_BBOX = {

minLat:51.98,
maxLat:52.25,
minLon:8.45,
maxLon:8.90

};

function inHerford(lat,lon){

return(
lat > HERFORD_BBOX.minLat &&
lat < HERFORD_BBOX.maxLat &&
lon > HERFORD_BBOX.minLon &&
lon < HERFORD_BBOX.maxLon
);

}

function resetStats(){

stats.baustellen = 0;
stats.unfaelle = 0;
stats.gefahren = 0;

}

function updateStats(){

document.getElementById("countBaustellen").innerText = stats.baustellen;
document.getElementById("countUnfaelle").innerText = stats.unfaelle;
document.getElementById("countGefahr").innerText = stats.gefahren;

}

async function loadTraffic(){

if(trafficLayer){
map.removeLayer(trafficLayer);
}

resetStats();

let features = [];

try{

const res = await fetch("https://verkehr.autobahn.de/o/autobahn");
const data = await res.json();

data.roads.forEach(road=>{

if(!road.events) return;

road.events.forEach(event=>{

const lat = event.latitude;
const lon = event.longitude;

if(!lat || !lon) return;
if(!inHerford(lat,lon)) return;

let type="gefahr";

if(event.description.toLowerCase().includes("unfall")){
type="unfall";
stats.unfaelle++;
}
else if(event.description.toLowerCase().includes("baustelle")){
type="baustelle";
stats.baustellen++;
}
else{
stats.gefahren++;
}

features.push({

type:"Feature",

properties:{
title:event.description,
type:type
},

geometry:{
type:"Point",
coordinates:[lon,lat]
}

});

});

});

}catch(err){

console.log("Autobahn API Fehler");

}

try{

const res2 = await fetch("data/traffic.geojson");
const localData = await res2.json();

localData.features.forEach(f=>{

features.push(f);

if(f.properties.type==="baustelle") stats.baustellen++;
if(f.properties.type==="unfall") stats.unfaelle++;
if(f.properties.type==="gefahr") stats.gefahren++;

});

}catch(e){

console.log("keine lokalen Daten");

}

trafficLayer = L.geoJSON({

type:"FeatureCollection",
features:features

},{

pointToLayer:function(feature,latlng){

let icon = icons.gefahr;

if(feature.properties.type==="baustelle"){
icon = icons.baustelle;
}

if(feature.properties.type==="unfall"){
icon = icons.unfall;
}

return L.marker(latlng,{icon:icon});

},

onEachFeature:function(feature,layer){

layer.bindPopup(

"<b>"+feature.properties.title+"</b>"

)

}

}).addTo(map);

updateStats();

}

loadTraffic();

setInterval(loadTraffic,180000);
