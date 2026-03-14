// Karte starten (Zentrum Kreis Herford)
const map = L.map("map",{
zoomControl:true
}).setView([52.114,8.673],11)


// Basiskarte
L.tileLayer(
"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
{
maxZoom:19,
attribution:"© OpenStreetMap"
}
).addTo(map)


// =============================
// CLUSTER LAYER
// =============================

const cluster = L.markerClusterGroup({

showCoverageOnHover:false,

spiderfyOnMaxZoom:true,

zoomToBoundsOnClick:true,

maxClusterRadius:50,


iconCreateFunction:function(cluster){

const count = cluster.getChildCount()

let size="small"

if(count>=10) size="medium"
if(count>=25) size="large"

return L.divIcon({

html:"<div>"+count+"</div>",

className:"marker-cluster marker-cluster-"+size,

iconSize:L.point(44,44)

})

}

})

map.addLayer(cluster)


// =============================
// EMOJI MARKER ICON
// =============================

function emojiIcon(emoji){

return L.divIcon({

className:"emoji-marker",

html:emoji,

iconSize:[34,34],

iconAnchor:[17,17]

})

}


// =============================
// MARKER FUNKTION
// =============================

function addMarker(lat,lon,emoji,text){

const marker = L.marker(
[lat,lon],
{
icon:emojiIcon(emoji)
}
)

marker.bindPopup(text)

cluster.addLayer(marker)

}
