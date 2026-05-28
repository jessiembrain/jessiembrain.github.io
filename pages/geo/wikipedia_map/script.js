mapboxgl.accessToken = 'YOUR_MAPBOX_TOKEN';

const map = new mapboxgl.Map({
  container: 'map',
  style: 'mapbox://styles/mapbox/light-v10',
  center: [-75.1652, 39.9526],
  zoom: 14
});

fetch('data.json')
  .then(res => res.json())
  .then(data => {
    const list = document.getElementById('list');

    data.forEach(location => {
      // Add marker
      const marker = new mapboxgl.Marker()
        .setLngLat([location.lng, location.lat])
        .addTo(map);

      // Add to sidebar
      const div = document.createElement('div');
      div.className = 'card';
      div.innerHTML = `
        <h3>${location.name}</h3>
        <p>${location.address}</p>
      `;

      div.onclick = () => {
        map.flyTo({
          center: [location.lng, location.lat],
          zoom: 16
        });
      };

      list.appendChild(div);
    });
  });
