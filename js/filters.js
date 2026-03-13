function filterCity(city){

trafficLayer.eachLayer(function(layer){

if(layer.feature.properties.city === city){
layer.addTo(map)
}else{
map.removeLayer(layer)
}

})

}
