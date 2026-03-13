let trafficLayer;

async function loadTraffic(){

if(trafficLayer){
map.removeLayer(trafficLayer);
}

const res = await fetch("data/traffic.geojson");
const data = await res.json();

trafficLayer = L.geoJSON(data,{

pointToLayer:function(feature,latlng){

let icon = icons.baustelle;

if(feature.properties.type==="unfall"){
icon = icons.unfall;
}

if(feature.properties.type==="gefahr"){
icon = icons.gefahr;
}

return L.marker(latlng,{icon:icon});

},

onEachFeature:function(feature,layer){

layer.bindPopup(

"<b>"+feature.properties.title+"</b><br>"+
feature.properties.city

)

}

}).addTo(map);

}

loadTraffic();

setInterval(loadTraffic,120000);
