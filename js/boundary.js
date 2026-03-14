let kreisLayer

fetch("data/kreis-herford.geojson")
.then(r=>r.json())
.then(data=>{

kreisLayer=L.geoJSON(data,{
style:{
color:"#c4001a",
weight:3,
fill:false
}
}).addTo(map)

map.fitBounds(kreisLayer.getBounds())

})
