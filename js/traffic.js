let trafficLayer;

// Bounding Box Kreis Herford
const HERFORD_BBOX = {
minLat: 52.00,
maxLat: 52.25,
minLon: 8.50,
maxLon: 8.90
};

function inHerford(lat, lon){

return (
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

try{

// Beispiel API (GeoJSON Traffic Events)
const response = await fetch(
"https://verkehr.autobahn.de/o/autobahn"
);

const data = await response.json();

let features = [];

data.roads.forEach(road => {

if(!road.events) return;

road.events.forEach(event => {

const lat = event.latitude;
const lon = event.longitude;

if(inHerford(lat,lon)){

features.push({

"type":"Feature",

"properties":{
"title":event.description || "Verkehrsmeldung",
"type":"gefahr",
"city":"Kreis Herford"
},

"geometry":{
"type":"Point",
"coordinates":[lon,lat]
}

});

}

});

});

trafficLayer = L.geoJSON({

"type":"FeatureCollection",
"features":features

},{

pointToLayer:function(feature,latlng){

let icon = icons.gefahr;

return L.marker(latlng,{icon:icon});

},

onEachFeature:function(feature,layer){

layer.bindPopup(
"<b>"+feature.properties.title+"</b><br>"+
feature.properties.city
)

}

}).addTo(map);

}catch(err){

console.error("Traffic API Fehler",err);

}

}

loadTraffic();

// alle 3 Minuten aktualisieren
setInterval(loadTraffic,180000);
