var map = L.map('map').setView([52.11,8.67],11);

L.tileLayer(
'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
{
attribution:'© OpenStreetMap'
}).addTo(map);


// Kreisgrenze laden

fetch("data/kreis-herford.geojson")
.then(res => res.json())
.then(data => {

var kreis = L.geoJSON(data,{

style:{
color:"#cc0000",
weight:3,
fillColor:"#cc0000",
fillOpacity:0.05
}

}).addTo(map);

map.fitBounds(kreis.getBounds());

});
