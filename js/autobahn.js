// Autobahn API Loader

export async function loadAutobahnMessages(map, layerGroup) {
    try {
        const response = await fetch("https://verkehr.autobahn.de/o/autobahn");

        if (!response.ok) {
            throw new Error("Autobahn API Fehler");
        }

        const data = await response.json();

        const roads = data.roads;

        for (const road of roads) {

            const detailResponse = await fetch(`https://verkehr.autobahn.de/o/autobahn/${road}/services`);
            const detail = await detailResponse.json();

            if (!detail.services) continue;

            detail.services.forEach(service => {

                if (!service.geometry) return;

                const coords = service.geometry.coordinates;

                const lat = coords[1];
                const lon = coords[0];

                const marker = L.circleMarker([lat, lon], {
                    radius: 6,
                    color: "#ff0000"
                });

                marker.bindPopup(`
                    <b>${service.title || "Verkehrsmeldung"}</b><br>
                    ${service.description || ""}
                `);

                marker.addTo(layerGroup);

            });

        }

    } catch (err) {
        console.error("Autobahn API Fehler:", err);
    }
}
