const map = L.map("map").setView([52.114,8.673],11)

L.tileLayer(
"https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
{
attribution:"© OpenStreetMap"
}
).addTo(map)

const cluster = L.markerClusterGroup({

showCoverageOnHover:false,

spiderfyOnMaxZoom:true,

maxClusterRadius:50,

iconCreateFunction:function(cluster){

const count = cluster.getChildCount()

let size="small"

if(count>10) size="medium"
if(count>30) size="large"

return L.divIcon({

html:"<div>"+count+"</div>",

className:"marker-cluster marker-cluster-"+size,

iconSize:L.point(40,40)

})

}

})

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
