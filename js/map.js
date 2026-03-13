var map = L.map('map').setView([52.114, 8.673], 11);

// OpenStreetMap Karte
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    maxZoom: 19,
    attribution: '© OpenStreetMap'
  }
).addTo(map);

// einfache Kreisgrenze (Bounding Box Kreis Herford)

var kreis = L.polygon([
  [51.98, 8.45],
  [51.98, 8.90],
  [52.25, 8.90],
  [52.25, 8.45]
],{
  color:"#cc0000",
  weight:3,
  fillColor:"#cc0000",
  fillOpacity:0.05
}).addTo(map);

map.fitBounds(kreis.getBounds());
