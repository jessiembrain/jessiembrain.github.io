(function () {
  'use strict';

  const mapContainer = document.getElementById('map');
  if (!mapContainer || window.innerWidth <= 768) return;

  // --- Landmarks ---
  const ART_MUSEUM = [-75.1803, 39.9656];
  const CITY_HALL = [-75.1638, 39.9526];

  function initializeMap() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiamJyYWluMSIsImEiOiJjbG85MTNmZW8wNW80MnFwbTRiZXJmNGZuIn0.4Ajv4kTvH6rx0ym0AmE-gQ';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/jbrain1/cmoszsu3g001j01s473gx6xzs',
      center: ART_MUSEUM,
      zoom: 5,
      bearing: 170,          // face south / down the Parkway
      pitch: 0,
      interactive: true,
      attributionControl: true
    });

    map.on('load', () => {
      map.setTerrain(null);

      // 1️⃣ Frame the Art Museum
      map.flyTo({
        center: ART_MUSEUM,
        zoom: 15,
        pitch: 65,
        bearing: 170,
        speed: 0.6,
        curve: 1.8,
        essential: true
      });

      // 2️⃣ Fly south to City Hall
      map.once('moveend', () => {
        flySouth(map);
      });
    });
  }

  function flySouth(map) {
    map.flyTo({
      center: CITY_HALL,
      zoom: 16,
      pitch: 75,
      bearing: 170,
      speed: 0.4,
      curve: 1.6,
      easing: (t) => t,
      essential: true
    });
  }

  // ✅ Initialize the map
  initializeMap();

})();
