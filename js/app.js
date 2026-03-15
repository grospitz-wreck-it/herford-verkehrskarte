import { loadAutobahnMessages } from "./autobahn.js";

const map = L.map("map").setView([52.114, 8.673], 11);

L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    attribution: "© OpenStreetMap"
}).addTo(map);

const messageLayer = L.layerGroup().addTo(map);


// Kreisgrenzen laden

fetch("data/kreis-herford.geojson")
    .then(r => r.json())
    .then(data => {

        L.geoJSON(data, {
            style: {
                color: "#0055ff",
                weight: 2,
                fillOpacity: 0
            }
        }).addTo(map);

    });


// Autobahnmeldungen laden

loadAutobahnMessages(map, messageLayer);
