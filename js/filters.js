function filterCity(city){

trafficLayer.eachLayer(function(layer){

if(city==="Alle"){
layer.addTo(map);
return;
}

if(layer.feature.properties.city===city){
layer.addTo(map);
}else{
map.removeLayer(layer);
}

});

}
