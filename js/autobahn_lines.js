async function loadAutobahnLines(){

const r=await fetch("data/autobahn_lines.json")

const data=await r.json()

L.geoJSON(data,{

style:function(feature){

return{

color:feature.properties.color,

weight:6,

opacity:0.8

}

},

onEachFeature:function(feature,layer){

layer.bindPopup(feature.properties.title)

}

}).addTo(map)

}

loadAutobahnLines()
