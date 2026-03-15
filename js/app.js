```javascript
import { loadAutobahnMessages } from "./autobahn.js";
import { loadTrafficData } from "./traffic.js";

const map = L.map("map").setView([52.114, 8.673], 11);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",{
attribution:"© OpenStreetMap"
}).addTo(map);


const autobahnLayer = L.markerClusterGroup();
const trafficLayer = L.markerClusterGroup();

map.addLayer(autobahnLayer);
map.addLayer(trafficLayer);


const overlays = {
"Autobahnmeldungen": autobahnLayer,
"Verkehrsmeldungen": trafficLayer
};

L.control.layers(null, overlays).addTo(map);


fetch("data/kreis-herford.geojson")
.then(r=>r.json())
.then(data=>{
L.geoJSON(data,{
style:{
color:"#0055ff",
weight:2,
fillOpacity:0
}
}).addTo(map);
});


async function loadData(){

autobahnLayer.clearLayers();
trafficLayer.clearLayers();

await loadAutobahnMessages(autobahnLayer);
await loadTrafficData(trafficLayer);

}

loadData();


setInterval(loadData,120000);
```
