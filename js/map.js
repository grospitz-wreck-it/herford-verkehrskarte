var map = L.map('map');

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
attribution:'© OpenStreetMap'
}).addTo(map);


// Kreisgrenze laden

fetch("data/kreis-herford.geojson")
.then(res => res.json())
.then(data => {

var kreisLayer = L.geoJSON(data,{
style:{
color:"#cc0000",
weight:3,
fillColor:"#cc0000",
fillOpacity:0.05
}
}).addTo(map);


// Karte auf Kreis zentrieren

map.fitBounds(kreisLayer.getBounds());

});
