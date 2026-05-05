(function() {
  'use strict';

  const mapContainer = document.getElementById('map');
  if (!mapContainer || window.innerWidth <= 768) return;

  function initializeMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiamJyYWluMSIsImEiOiJjbG85MTNmZW8wNW80MnFwbTRiZXJmNGZuIn0.4Ajv4kTvH6rx0ym0AmE-gQ';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/jbrain1/cmoszsu3g001j01s473gx6xzs',
      center: [-75.16368012081547, 39.952484115995304],
      zoom: 2,
      interactive: false,
      attributionControl: false
    });

    map.on('load', () => {
      map.setTerrain(null);

      map.flyTo({
        center: [-75.16368012081547, 39.952484115995304],
        zoom: 16,
        pitch: 83,
        speed: 0.7,
        curve: 1,
        essential: true
      });

      map.once('moveend', () => {
        map.easeTo({
          pitch: 85,
          bearing: 6,
          duration: 5000,
          easing: (t) => t,
          essential: true
        });
        flyNorth(map);
      });
    });
  }

  function flyNorth(map) {
    const duration = 100000;
    const start = performance.now();
    const startLat = map.getCenter().lat;
    const deltaLat = 1;

    function ease(t) {
      return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
    }

    function animate(time) {
      const progress = Math.min((time - start) / duration, 1);
      const newLat = startLat + deltaLat * ease(progress);
      map.setCenter([map.getCenter().lng, newLat]);
      if (progress < 1) requestAnimationFrame(animate);
    }

    requestAnimationFrame(animate);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeMap);
  } else {
    initializeMap();
  }
})();
