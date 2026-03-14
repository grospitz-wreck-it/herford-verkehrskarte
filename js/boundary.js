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
