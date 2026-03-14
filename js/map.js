const map = L.map("map").setView([52.114,8.673],11)

L.tileLayer(
"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
{ attribution:"© OpenStreetMap" }
).addTo(map)

const cluster = L.markerClusterGroup()
map.addLayer(cluster)

function emojiIcon(e){

return L.divIcon({
className:"emoji-marker",
html:e,
iconSize:[28,28]
})

}

function addMarker(lat,lon,emoji,text){

const marker=L.marker([lat,lon],{
icon:emojiIcon(emoji)
})

marker.bindPopup(text)

cluster.addLayer(marker)

}


// Kreis laden
fetch("data/kreis-herford.geojson")
.then(r=>r.json())
.then(data=>{

const border=L.geoJSON(data,{
style:{
color:"#c4001a",
weight:3,
fill:false
}
}).addTo(map)

map.fitBounds(border.getBounds())

})
