```javascript
export async function loadTrafficData(layer){

try{

const response = await fetch("https://verkehr.autobahn.de/o/autobahn/A30/services");

const data = await response.json();

data.services.forEach(service=>{

if(!service.geometry) return;

const coords = service.geometry.coordinates;

const marker = L.circleMarker([coords[1],coords[0]],{
radius:7,
color:"#ff5500"
});

marker.bindPopup(`
<b>${service.title}</b><br>
${service.description || ""}
`);

layer.addLayer(marker);

});

}catch(err){

console.error("Traffic Fehler",err);

}

}
```
