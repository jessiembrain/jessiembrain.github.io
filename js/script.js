(function () {
  'use strict';

  const mapContainer = document.getElementById('map');
  if (!mapContainer || window.innerWidth <= 768) return;

  // --- Parkway waypoints ---
  const ART_MUSEUM = [-75.1803, 39.9656];
  const CITY_HALL = [-75.1638, 39.9526];

  function initializeMap() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiamJyYWluMSIsImEiOiJjbG85MTNmZW8wNW80MnFwbTRiZXJmNGZuIn0.4Ajv4kTvH6rx0ym0AmE-gQ';

    
const map = new mapboxgl.Map({
    container: 'map',
    style: 'mapbox://styles/jbrain1/cmoszsu3g001j01s473gx6xzs',
    center: ART_MUSEUM,
    zoom: 17.5,
    pitch: 80,
    bearing: 135, // aligns with Parkway axis
    interactive: true,
    easing: t => t,
    attributionControl: true
  });

   map.on('load', () => {
    map.setTerrain(null);

    map.flyTo({
      center: CITY_HALL,
      zoom: 19.5,
      pitch: 80,
      bearing: 130,
      speed: 0.12,
      curve: 1.6,
      easing: t => t,
      essential: true
    });
  });
}

initializeMap();
})();
