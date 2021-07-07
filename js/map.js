import {
  similarAdverts
} from './main.js';

import {
  typesRussian,
  TOKYO_LAT_LNG,
  MAX_DECIMAL_FRACTION,
  START_TOKYO_POINTS,
  ZOOM
} from './data.js';

export const addressInput = document.querySelector('#address');

const isEscEvent = (e) => {
  e.key === 'Escape' || e.key === 'Esc';
};


export const closeModal = (response) => {
  response.classList.add('hidden');
};

const createOnModalCloseClick = (ab) => {
  return (e) => {
    e.preventDefault();
    ab();
  };
};

const createOnModalEscKeydown = (ab) => {
  return (e) => {
    if (isEscEvent(e)) {
      e.preventDefault();
      ab();
    }
  };
};

export const openModal = (response) => {
  const clickCloseModalHandler = createOnModalCloseClick(() => {
    document.removeEventListener('keydown', keydownCloseModalHandler, true);
    response.removeEventListener('click', clickCloseModalHandler, true);
    closeModal(response);
  });

  const keydownCloseModalHandler = createOnModalEscKeydown(() => {
    document.removeEventListener('keydown', keydownCloseModalHandler, true);
    response.removeEventListener('click', clickCloseModalHandler, true);
    closeModal(response);
  });

  response.classList.remove('hidden');

  document.addEventListener('keydown', keydownCloseModalHandler, true);
  response.addEventListener('click', clickCloseModalHandler, true);
};

const createCustomPopup = (advert) => {
  const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

  const popup = cardTemplate.cloneNode(true);

  const popupTitle = popup.querySelector('.popup__title');
  popupTitle.textContent = advert.offer.title;

  const popupTextAddrress = popup.querySelector('.popup__text--address');
  popupTextAddrress.textContent = advert.offer.address;

  const popupTextPrice = popup.querySelector('.popup__text--price ');
  popupTextPrice.textContent = `${advert.offer.price} ₽/ночь`;

  const popupType = popup.querySelector('.popup__type ');
  popupType.textContent = `${advert.offer.type}  ${typesRussian[advert.offer.type]}`;

  const popupTextCapacity = popup.querySelector('.popup__text--capacity');
  popupTextCapacity.textContent = `${advert.offer.rooms} комнаты для ${advert.offer.guests} гостей`;

  const popupTextTime = popup.querySelector('.popup__text--time ');
  popupTextTime.textContent = `Заезд после ${advert.offer.checkin} , выезд до ${advert.offer.checkout}`;

  const popupDescription = popup.querySelector('.popup__description');
  popupDescription.textContent = advert.description;

  const featuresElement = popup.querySelector('.popup__features');
  featuresElement.innerHTML = '';
  const featuresFragment = document.createDocumentFragment();
  advert.offer.features.forEach((feature) => {
    const li = document.createElement('li');
    li.classList.add('popup__feature', 'popup__feature--' + feature);
    featuresFragment.appendChild(li);
  });
  featuresElement.appendChild(featuresFragment);

  const photosElement = popup.querySelector('.popup__photos');
  photosElement.innerHTML = '';
  const photosFragment = document.createDocumentFragment();
  advert.offer.photos.forEach((photo) => {
    const img = document.createElement('img');
    img.classList.add('popup__photo');
    img.alt = 'Фотография жилья';
    img.src = photo;
    img.width = '45px';
    img.height = '40px';
    photosFragment.appendChild(img);
  });
  photosElement.appendChild(photosFragment);

  return popup;
};

const map = L.map('map-canvas')
  .on('load', () => {
    addressInput.value = START_TOKYO_POINTS;
  })
  .setView(
    TOKYO_LAT_LNG, ZOOM);

L.tileLayer(
  'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  },
).addTo(map);

const mainPinIcon = L.icon({
  iconUrl: './img/main-pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainPinMarker = L.marker(
  TOKYO_LAT_LNG, {
    draggable: true,
    icon: mainPinIcon,
  }).addTo(map);

mainPinMarker.on('moveend', (e) => {
  const coordinates = e.target.getLatLng();
  addressInput.value = `${coordinates.lat.toFixed(MAX_DECIMAL_FRACTION)}, ${coordinates.lng.toFixed(MAX_DECIMAL_FRACTION)}`;
});

const markerGroup = L.layerGroup().addTo(map);

const createMarker = (advert) => {
  const {
    lat,
    lng,
  } = advert.location;

  const icon = L.icon({
    iconUrl: './img/pin.svg',
    iconSize: [40, 40],
    iconAnchor: [20, 40],
  });

  const marker = L.marker({
    lat,
    lng,
  }, {
    icon,
  });

  marker
    .addTo(markerGroup)
    .bindPopup(
      createCustomPopup(advert), {
        keepInView: true,
      },
    );
};

similarAdverts.forEach(function(adv) {
  createMarker(adv);
});
