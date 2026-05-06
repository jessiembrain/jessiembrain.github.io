(function() {
  'use strict';

  const mapContainer = document.getElementById('map');
  if (!mapContainer || window.innerWidth <= 768) return;

  function initializeMap() {
    mapboxgl.accessToken = 'pk.eyJ1IjoiamJyYWluMSIsImEiOiJjbG85MTNmZW8wNW80MnFwbTRiZXJmNGZuIn0.4Ajv4kTvH6rx0ym0AmE-gQ';

    const map = new mapboxgl.Map({
      container: 'map',
      style: 'mapbox://styles/jbrain1/cmoszsu3g001j01s473gx6xzs',
      center: [-75.163672138798, 39.95233943965799],
      zoom: 5,
      interactive: true,
      attributionControl: false, 
      bearing: 10
    });

    map.on('load', () => {
      map.setTerrain(null);

      map.flyTo({
        center: [-75.163672138798, 39.95233943965799],
        zoom: 18,
        pitch: 85,
        speed: 0.5,
        curve: 3,
        essential: true
      });

      map.once('moveend', () => {
        map.easeTo({
          pitch: 85,
          duration: 10,
          easing: (t) => t,
          essential: true, 
          speed: 0.2
        });

        flyNorth(map);

        map.once('moveend', () => {
          map.easeTo({
            pitch: 90,
            easing: (t) => t,
            essential: true
          });
        });
      });
    });
  }

  initializeMap(); // <-- you were missing this call

})(); // <-- this closes and invokes the IIFE
