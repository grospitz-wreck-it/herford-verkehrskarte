fetch("data/traffic.json")
.then(r=>r.json())
.then(data=>{

L.geoJSON(data,{

pointToLayer:function(feature,latlng){

return L.circleMarker(latlng,{

radius:7,
color:"#c4001a",
fillColor:"#c4001a",
fillOpacity:1,
weight:1

});

},

onEachFeature:function(feature,layer){

layer.bindPopup(feature.properties.title);

}

}).addTo(map);

});
