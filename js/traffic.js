
let trafficLayer;

async function loadTraffic(){

if(trafficLayer){
map.removeLayer(trafficLayer);
}

const response = await fetch("data/traffic.geojson");
const data = await response.json();

trafficLayer = L.geoJSON(data,{
style:{
color:"red",
weight:4
},
onEachFeature:function(feature,layer){

layer.bindPopup(
"<b>"+feature.properties.title+"</b>"
);

}
}).addTo(map);

}

loadTraffic();

setInterval(loadTraffic,120000);
