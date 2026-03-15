```javascript
export async function loadAutobahnMessages(layer){

try{

const response = await fetch("https://verkehr.autobahn.de/o/autobahn/A2/services");

const data = await response.json();

data.services.forEach(service=>{

if(!service.geometry) return;

const coords = service.geometry.coordinates;

const marker = L.marker([coords[1],coords[0]]);

marker.bindPopup(`
<b>${service.title}</b><br>
${service.description || ""}
`);

layer.addLayer(marker);

});

}catch(err){

console.error("Autobahn API Fehler",err);

}

}
```
