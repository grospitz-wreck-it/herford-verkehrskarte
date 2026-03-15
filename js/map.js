// Karte starten
const map = L.map("map",{
zoomControl:true
}).setView([52.114,8.673],11)


// =============================
// BASEMAP
// =============================

const osm = L.tileLayer(
"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
{
maxZoom:19,
attribution:"© OpenStreetMap"
}
).addTo(map)


// =============================
// LIVE TRAFFIC LAYER
// =============================

const trafficLayer = L.tileLayer(
"https://traffic.maps.ls.hereapi.com/traffic/6.3/flowtile/{z}/{x}/{y}/256/png8?apiKey=YOUR_API_KEY",
{
opacity:0.7
}
)


// =============================
// CLUSTER
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
// EMOJI MARKER
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
// MARKER HINZUFÜGEN
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


// =============================
// LAYER CONTROL
// =============================

const baseMaps = {
"Standardkarte":osm
}

const overlayMaps = {
"Live Stau":trafficLayer,
"Meldungen":cluster
}

L.control.layers(baseMaps,overlayMaps).addTo(map)
