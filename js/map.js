const map = L.map("map",{zoomControl:true})
.setView([52.114,8.673],11)

L.tileLayer(
"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
{ attribution:"© OpenStreetMap" }
).addTo(map)

const cluster = L.markerClusterGroup()

map.addLayer(cluster)

function icon(e){

return L.divIcon({
className:"marker",
html:e,
iconSize:[30,30]
})

}

function addMarker(lat,lon,emoji,text){

const marker=L.marker([lat,lon],{
icon:icon(emoji)
})

marker.bindPopup(text)

cluster.addLayer(marker)

}
