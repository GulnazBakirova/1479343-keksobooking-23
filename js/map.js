import {
  addressInput,
  mapFiltersChildren,
  formChildren,
  changeFormState,
  changeFilterState
} from './form.js';

import {
  createCustomPopup,
  getCurrentOffer
} from './card.js';

import {
  MAX_DECIMAL_NUMBERS,
  MAIN_PIN,
  PIN,
  START_POINTS,
  START_POINTS_OBJECT,
  TOKYO_LAT,
  TOKYO_LNG,
  ZOOM,
  PINS_AMOUNT
} from './data.js';

import {
  getData
} from './api.js';

import {
  errorGetData,
  openModal
} from './user-modal.js';

changeFormState(formChildren, true);
changeFilterState(mapFiltersChildren, true);

// создаю карту
const map = L.map('map-canvas')
  .on('load', () => {
    changeFormState(formChildren, false);
    changeFilterState(mapFiltersChildren, false);
    addressInput.value = START_POINTS;
  })
  .setView(START_POINTS_OBJECT, ZOOM);

// добавляю изображение карты
L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
  {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors | Icons made by <a href="https://www.freepik.com" title="Freepik">Freepik</a> from <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>',
  },
).addTo(map);

// меняю изображение по дефолту на изображение из ТЗ
const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [MAIN_PIN, MAIN_PIN],
  iconAnchor: [MAIN_PIN / 2, MAIN_PIN],
});

// добавляю главный маркер
const mainPinMarker = L.marker(
  START_POINTS_OBJECT,
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

// добавляю иконки
const icon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [PIN, PIN],
  iconAnchor: [PIN / 2, PIN],
});

mainPinMarker.addTo(map);

mainPinMarker.on('moveend', (e) => {
  const coordinates = e.target.getLatLng();
  addressInput.value = `${coordinates.lat.toFixed(MAX_DECIMAL_NUMBERS)}, ${coordinates.lng.toFixed(MAX_DECIMAL_NUMBERS)}`;
});

// возвращение к начальным значениям масштаба и центра карты
const refreshMap = () => {
  map.setView(START_POINTS_OBJECT, ZOOM);
  const startLatLng = new L.LatLng(TOKYO_LAT, TOKYO_LNG);
  mainPinMarker.setLatLng(startLatLng);

  getData(
    (offers) => {
      const dataOffers = getOffers(offers);
      const markers = getMarkers(dataOffers);
      showPins(markers);
    },
    () => {
      openModal(errorGetData);
      changeFilterState(mapFiltersChildren, true);
    },
  );
};

const getOffers = offers => offers.map(item => getCurrentOffer(item));

// добавляю попап к меткам объявлений
const getMarkers = (pins) => {
  return pins.slice(0, PINS_AMOUNT).map(pin => L.marker(
    {
      lat: pin.lat,
      lng: pin.lng,
    },
    {
      icon,
    },
  ).bindPopup(
    createCustomPopup(pin),
    {
      keepInView: true,
    },
  ));
};

const showPins = (markers) => markers.forEach(marker => marker.addTo(map));

const hidePins = (markers) => markers.forEach(marker => marker.remove());

export {refreshMap, getOffers, getMarkers, showPins, hidePins};
