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
      zoom: 5,
      interactive: false,
      attributionControl: false
    });

    map.on('load', () => {
      map.setTerrain(null);

      map.flyTo({
        center: [-75.16509932664746,39.94557990625049],
        zoom: 16,
        pitch: 100,
        speed: 0.5,
        curve: 3,
        essential: true
      });

      map.once('moveend', () => {
        map.easeTo({
          pitch: 85,
          bearing: 10,
          duration: 10,
          easing: (t) => t,
          essential: true
        });

        flyNorth(map);

        map.once('moveend', () => {
          map.easeTo({
            pitch: 90,
            bearing: 250,
            easing: (t) => t,
            essential: true
          });
        });
      });
    });
  }

  initializeMap(); // <-- you were missing this call

})(); // <-- this closes and invokes the IIFE
