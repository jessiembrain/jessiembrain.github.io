(function () {
  'use strict';

  const mapContainer = document.getElementById('map');
  if (!mapContainer || window.innerWidth <= 768) return;

  // --- Parkway waypoints ---
  const ART_MUSEUM = [-75.1803, 39.9656];
  const LOGAN_CIRCLE = [-75.1703, 39.9579];
  const CITY_HALL = [-75.1638, 39.9526];

  function initializeMap() {
    mapboxgl.accessToken =
      'pk.eyJ1IjoiamJyYWluMSIsImEiOiJjbG85MTNmZW8wNW80MnFwbTRiZXJmNGZuIn0.4Ajv4kTvH6rx0ym0AmE-gQ';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/jbrain1/cmoszsu3g001j01s473gx6xzs',
      center: ART_MUSEUM,
      zoom: 15,
      pitch: 70,
      bearing: 170,
      interactive: true,
      attributionControl: true
    });

    map.on('load', () => {
      map.setTerrain(null);

      // START: Art Museum reveal
      map.flyTo({
        center: ART_MUSEUM,
        zoom: 15,
        pitch: 75,
        bearing: 150,
        speed: 0.35,
        curve: 1.2,
        essential: true
      });

      map.once('moveend', () => flySegment(map));
    });
  }

  function flySegment(map) {
    // SEGMENT 1: Art Museum → Logan Circle
    map.flyTo({
      center: LOGAN_CIRCLE,
      zoom: 16.5,
      pitch: 78,
      bearing: 150,
      speed: 0.28,
      curve: 1.1,
      easing: t => t,
      essential: true
    });

    map.once('moveend', () => flyFinal(map));
  }

  function flyFinal(map) {
    // SEGMENT 2: Logan Circle → City Hall
    map.flyTo({
      center: CITY_HALL,
      zoom: 16.5,
      pitch: 82,
      bearing: 150, // slight turn toward City Hall axis
      speed: 0.25,
      curve: 1.05,
      easing: t => t,
      essential: true
    });
  }

  initializeMap();
})();
