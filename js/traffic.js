let trafficLayer;

async function loadTraffic(){

if(trafficLayer){
map.removeLayer(trafficLayer);
}

const res=await fetch("data/traffic.geojson");
const data=await res.json();

trafficLayer=L.geoJSON(data,{

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

layer.bindPopup("<b>"+feature.properties.title+"</b>")

}

}).addTo(map);

}

loadTraffic();

setInterval(loadTraffic,120000);
