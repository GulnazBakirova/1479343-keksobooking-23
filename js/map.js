import {createAdvert, createPopup} from './main.js';

const addressInput = document.querySelector('#address');
const resetButton = document.querySelector('#reset');

const map = L.map('map-canvas')
  .setView({
    lat: 35.6895,
    lng: 139.69171,
  }, 16);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  {
    lat: 35.6895,
    lng: 139.69171,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (e) => {
  const coordinates = e.target.getLatLng();
  addressInput.value = `${coordinates.lat.toFixed(5)}, ${coordinates.lng.toFixed(5)}`;
});

const refreshMap = () => {
  map.setView(35.6895, 139.69171, 13);
  const startLatLng = new L.LatLng(35.6895, 139.69171);
  mainPinMarker.setLatLng(startLatLng);

  getData(
    (offers) => {
      const structuredOffers = getOffers(offers);
      const markers = getMarkers(structuredOffers);
      showPins(markers);
    },
  );
};

const getOffers = offers => offers.map(item => createAdvert(item));

const getMarkers = (pins) => {
  return pins.slice(0, 10).map(pin => L.marker(
    {
      lat: pin.lat,
      lng: pin.lng,
    },
    {
      icon,
    },
  ).bindPopup(
    createPopup(pin),
    {
      keepInView: true,
    },
  ));
};

const showPins = (markers) => markers.forEach(marker => marker.addTo(map));

const hidePins = (markers) => markers.forEach(marker => marker.remove());
