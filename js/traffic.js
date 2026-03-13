let trafficLayer;

let countBaustellen = 0;
let countUnfaelle = 0;
let countGefahr = 0;

const HERFORD_BBOX = {

minLat:52.00,
maxLat:52.25,
minLon:8.50,
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

async function loadTraffic(){

if(trafficLayer){
map.removeLayer(trafficLayer);
}

countBaustellen = 0;
countUnfaelle = 0;
countGefahr = 0;

try{

const response = await fetch(
"https://verkehr.autobahn.de/o/autobahn"
);

const data = await response.json();

let features = [];

data.roads.forEach(road=>{

if(!road.events) return;

road.events.forEach(event=>{

const lat = event.latitude;
const lon = event.longitude;

if(!inHerford(lat,lon)) return;

let type="gefahr";

if(event.description.includes("Baustelle")){
type="baustelle";
countBaustellen++;
}

if(event.description.includes("Unfall")){
type="unfall";
countUnfaelle++;
}

features.push({

"type":"Feature",

"properties":{
"title":event.description,
"type":type,
"city":"Kreis Herford"
},

"geometry":{
"type":"Point",
"coordinates":[lon,lat]
}

});

});

});

trafficLayer = L.geoJSON({

"type":"FeatureCollection",
"features":features

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

document.getElementById("countBaustellen").innerText=countBaustellen;
document.getElementById("countUnfaelle").innerText=countUnfaelle;
document.getElementById("countGefahr").innerText=countGefahr;

}catch(err){

console.log("Traffic API Fehler",err);

}

}

loadTraffic();

setInterval(loadTraffic,180000);
