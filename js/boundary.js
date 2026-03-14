let kreis

fetch("data/kreis-herford.geojson")
.then(r=>r.json())
.then(data=>{

kreis=L.geoJSON(data,{
style:{
color:"#c4001a",
weight:3,
fill:false
}
}).addTo(map)

map.fitBounds(kreis.getBounds())

})
