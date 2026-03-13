var map = L.map('map');

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
attribution:'© OpenStreetMap'
}).addTo(map);


// Kreisgrenze

fetch("data/kreis-herford.geojson")
.then(res=>res.json())
.then(data=>{

var kreisLayer=L.geoJSON(data,{
style:{
color:"#cc0000",
weight:3,
fillColor:"#cc0000",
fillOpacity:0.05
}
}).addTo(map)

map.fitBounds(kreisLayer.getBounds())

})


// Gemeinden laden

fetch("data/gemeinden.json")
.then(res=>res.json())
.then(data=>{

data.forEach(g=>{

L.circleMarker([g.lat,g.lon],{

radius:6,
color:"#333",
fillColor:"#333",
fillOpacity:1

})
.addTo(map)
.bindTooltip(g.name,{permanent:true,direction:"top"})

})

})
