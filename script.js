"use strict";

const MAP = L.map('map', {
	maxZoom: 15,
	minZoom: 10
}).setView([49.0135714, 16.2823722], 12);

const URL_CARTO = "https://cartodb-basemaps-{s}.global.ssl.fastly.net/" + "light_all/{z}/{x}/{y}.png";
const URL_OSM = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
const URL_GMAPS = "https://{s}.google.com/vt/lyrs=m&x={x}&y={y}&z={z}&scale=2";

const CARTO = L.tileLayer(URL_CARTO);
const OSM = L.tileLayer(URL_OSM, {
	attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>'
});
const GMAPS = L.tileLayer(URL_GMAPS, {
	subdomains: ['mt0', 'mt1', 'mt2', 'mt3']
});

const SCALE = L.control.scale();
MAP.addControl(SCALE);
MAP.addLayer(OSM);

const BASE_LAYERS = {
	"Carto": CARTO,
	"Google Maps": GMAPS,
	"OpenStreetMap": OSM
};

const BUNKR_URL = 'https://zelda.sci.muni.cz/geoserver/webovka/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=webovka%3ABunkr&maxFeatures=50&outputFormat=application%2Fjson';

function style_point1() {
	return {
		color: "#2F4F4F",
		radius: 8,
		fillColor: "#696969",
		weight: 3,
		fillOpacity: 0.5
	}
}

fetch(BUNKR_URL)
	.then(response => response.json())
	.then(data => {
		const BUNKR_DATA = L.geoJSON(data, {
			pointToLayer: function (feature, latlng) {
				return L.circleMarker(latlng, style_point1(feature))
			}
		});
		const BUNKR_CLUSTER = L.markerClusterGroup({
			maxClusterRadius: 40,
			disableClusteringAtZoom: 15,
		});
		BUNKR_CLUSTER
			.addLayer(BUNKR_DATA)
			.addTo(MAP)
			.bindPopup(MARKER => {
				let content = document.createElement('table');

				Object.entries(MARKER.feature.properties)
					.forEach(property => {
						let row = document.createElement('tr');
						row.innerHTML = `<td>${property[1]}</td>`;
						content.appendChild(row);
					});
				return content;
			});
		LAYERS.addOverlay(BUNKR_CLUSTER, "Bunkry");
	});
const LAYERS = L.control.layers(BASE_LAYERS);
MAP.addControl(LAYERS);

const CHURCH_URL = 'https://zelda.sci.muni.cz/geoserver/webovka/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=webovka%3ACirkevni_pamatka&maxFeatures=50&outputFormat=application%2Fjson';

function style_point2() {
	return {
		color: "#FFB90F",
		radius: 8,
		fillColor: "#FFD700",
		weight: 3,
		fillOpacity: 0.5
	}
}

fetch(CHURCH_URL)
	.then(response => response.json())
	.then(data => {
		const CHURCH_DATA = L.geoJSON(data, {
			pointToLayer: function (feature, latlng) {
				return L.circleMarker(latlng, style_point2(feature))
			}
		});
		const CHURCH_CLUSTER = L.markerClusterGroup({
			maxClusterRadius: 40,
			disableClusteringAtZoom: 15,
		});
		CHURCH_CLUSTER
			.addLayer(CHURCH_DATA)
			.bindPopup(MARKER => {
				let content = document.createElement('table');

				Object.entries(MARKER.feature.properties)
					.forEach(property => {
						let row = document.createElement('tr');
						row.innerHTML = `<td>${property[1]}</td>`;
						content.appendChild(row);
					});
			
				return content;
			})
			.addTo(MAP);
		LAYERS.addOverlay(CHURCH_CLUSTER, "Církevní památky");
	});

const CASTLE_URL = 'https://zelda.sci.muni.cz/geoserver/webovka/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=webovka%3AHrad_a_zamek&maxFeatures=50&outputFormat=application%2Fjson';

function style_point3() {
	return {
		color: "#8B4513",
		radius: 8,
		fillColor: "#A0522D",
		weight: 3,
		fillOpacity: 0.5
	}
}

fetch(CASTLE_URL)
	.then(response => response.json())
	.then(data => {
		const CASTLE_DATA = L.geoJSON(data, {
			pointToLayer: function (feature, latlng) {
				return L.circleMarker(latlng, style_point3(feature))
			}
		});
		const CASTLE_CLUSTER = L.markerClusterGroup({
			maxClusterRadius: 40,
			disableClusteringAtZoom: 15,
		});
		CASTLE_CLUSTER
			.addLayer(CASTLE_DATA)
			.bindPopup(MARKER => {
				let content = document.createElement('table');

				Object.entries(MARKER.feature.properties)
					.forEach(property => {
						let row = document.createElement('tr');
						row.innerHTML = `<td>${property[1]}</td>`;
						content.appendChild(row);
					});
				return content;
			})
			.addTo(MAP);
		LAYERS.addOverlay(CASTLE_CLUSTER, "Hrady a zámky");
	});

const MUSEUM_URL = 'https://zelda.sci.muni.cz/geoserver/webovka/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=webovka%3AMuzeum&maxFeatures=50&outputFormat=application%2Fjson';

function style_point4() {
	return {
		color: "#006400",
		radius: 8,
		fillColor: "#32CD32",
		weight: 3,
		fillOpacity: 0.5
	}
}

fetch(MUSEUM_URL)
	.then(response => response.json())
	.then(data => {
		const MUSEUM_DATA = L.geoJSON(data, {
			pointToLayer: function (feature, latlng) {
				return L.circleMarker(latlng, style_point4(feature))
			}
		});
		const MUSEUM_CLUSTER = L.markerClusterGroup({
			maxClusterRadius: 40,
			disableClusteringAtZoom: 15,
		});
		MUSEUM_CLUSTER
			.addLayer(MUSEUM_DATA)
			.bindPopup(MARKER => {
				let content = document.createElement('table');

				Object.entries(MARKER.feature.properties)
					.forEach(property => {
						let row = document.createElement('tr');
						row.innerHTML = `<td>${property[1]}</td>`;
						content.appendChild(row);
					});
				return content;
			})
			.addTo(MAP);
		LAYERS.addOverlay(MUSEUM_CLUSTER, "Muzea");
	});

const TOURIST_URL = 'https://zelda.sci.muni.cz/geoserver/webovka/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=webovka%3ATuristicke_misto&maxFeatures=50&outputFormat=application%2Fjson';

function style_point5() {
	return {
		color: "#DC143C",
		radius: 8,
		fillColor: "#FA8072",
		weight: 3,
		fillOpacity: 0.5
	}
}

fetch(TOURIST_URL)
	.then(response => response.json())
	.then(data => {
		const TOURIST_DATA = L.geoJSON(data, {
			pointToLayer: function (feature, latlng) {
				return L.circleMarker(latlng, style_point5(feature))
			}
		});
		const TOURIST_CLUSTER = L.markerClusterGroup({
			maxClusterRadius: 40,
			disableClusteringAtZoom: 15,
		});
		TOURIST_CLUSTER
			.addLayer(TOURIST_DATA)
			.bindPopup(MARKER => {
				let content = document.createElement('table');

				Object.entries(MARKER.feature.properties)
					.forEach(property => {
						let row = document.createElement('tr');
						row.innerHTML = `<td>${property[1]}</td>`;
						content.appendChild(row);
					});
				return content;
			})
			.addTo(MAP);
		LAYERS.addOverlay(TOURIST_CLUSTER, "Turistická místa");
	});

const VILLAGE_URL = 'https://zelda.sci.muni.cz/geoserver/webovka/ows?service=WFS&version=1.0.0&request=GetFeature&typeName=webovka%3AObec&maxFeatures=50&outputFormat=application%2Fjson';

	
function style_polygon1() {
	return {
		color: "#696969",
		fillColor: "#C0C0C0",
		weight: 2,
		fillOpacity: 0.3
	}
}
	
fetch(VILLAGE_URL)
	.then(response => response.json())
	.then(data => {
		const VILLAGE_DATA = L.geoJSON(data, {
			style: function (feature) {
				return style_polygon1(feature)
			},
		}).addTo(MAP);
		LAYERS.addOverlay(VILLAGE_DATA, "Katastrální území obcí");
	});