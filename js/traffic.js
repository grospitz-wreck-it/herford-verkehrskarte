let trafficLayer;

let stats={
baustellen:0,
unfaelle:0,
gefahren:0
};

function updateStats(){

document.getElementById("countBaustellen").innerText=stats.baustellen;
document.getElementById("countUnfaelle").innerText=stats.unfaelle;
document.getElementById("countGefahr").innerText=stats.gefahren;

}

async function loadTraffic(){

if(trafficLayer){
map.removeLayer(trafficLayer);
}

stats={
baustellen:0,
unfaelle:0,
gefahren:0
};

let features=[];

try{

const res=await fetch("data/traffic.geojson");
const data=await res.json();

data.features.forEach(f=>{

features.push(f);

if(f.properties.type==="baustelle") stats.baustellen++;
if(f.properties.type==="unfall") stats.unfaelle++;
if(f.properties.type==="gefahr") stats.gefahren++;

});

}catch(e){

console.log("keine daten");

}

trafficLayer=L.geoJSON({

type:"FeatureCollection",
features:features

},{

pointToLayer:function(feature,latlng){

let icon=icons.gefahr;

if(feature.properties.type==="baustelle"){
icon=icons.baustelle;
}

if(feature.properties.type==="unfall"){
icon=icons.unfall;
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

setInterval(loadTraffic,120000);
