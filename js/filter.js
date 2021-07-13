// фильтрация

import {
  PRICE,
  RERENDER_DELAY
} from './data.js';

import {
  mapFilters
} from './form.js';

import {
  getMarkers,
  hidePins,
  showPins
} from './map.js';

const debounce = (cb) => {
  let lastTimeout = null;

  return function () {
    const parameters = arguments;

    if (lastTimeout) {
      window.clearTimeout(lastTimeout);
    }

    lastTimeout = window.setTimeout(function () {
      cb.apply(null, parameters);
    }, RERENDER_DELAY);
  };
};

export const filterPins = (offers, markers) => {
  const getFilterParameter = (evt) => {
    const target = evt.target;
    return {
      parameter: target.name.replace(/housing-/, ''),
      value: target.value,
    };
  };

  const filterByOptions = (array, parameter, value) => value === 'any' ? array : array.filter(offer => offer[parameter] === value);
  const filterByPrice = (array, parameter, value) => value === 'any' ? array : array.filter(offer => {
    switch (value) {
      case 'low':
        return +offer[parameter] < PRICE.low;
      case 'high':
        return +offer[parameter] > PRICE.high;
      case 'middle':
        return +offer[parameter] <= PRICE.high && +offer[parameter] >= PRICE.low;
      default:
        return;
    }
  });

  const filterByCheckboxes = (array, parameter) => {
    const features = [...mapFilters.querySelectorAll('input[type="checkbox"]:checked')];
    const featuresValues = features.map(feature => feature.value);
    return array.filter(offer => JSON.stringify(featuresValues) === JSON.stringify(offer[parameter]));
  };

  const Filters = {
    result: [],
    filterByType(value) {
      this.result = filterByOptions(this.result, 'type', value);
      return this;
    },
    filterByPrice(value) {
      this.result = filterByPrice(this.result, 'price', value);
      return this;
    },
    filterByRooms(value) {
      this.result = filterByOptions(this.result, 'rooms', value);
      return this;
    },
    filterByGuests(value) {
      this.result = filterByOptions(this.result, 'guests', value);
      return this;
    },
    filterByFeatures() {
      this.result = filterByCheckboxes(this.result, 'features');
      return this;
    },
  };

  const filterValues = {
    type: 'any',
    price: 'any',
    rooms: 'any',
    guests: 'any',
  };

  const createFilterChangeHandler = () => {
    window.myFormData = new FormData(mapFilters);
    let filteredMarkers = [...markers];

    return (evt) => {
      const {
        parameter,
        value,
      } = getFilterParameter(evt);
      hidePins(filteredMarkers);

      Filters.result = [...offers];
      filterValues[parameter] = value;
      Filters
        .filterByType(filterValues.type)
        .filterByPrice(filterValues.price)
        .filterByRooms(filterValues.rooms)
        .filterByGuests(filterValues.guests)
        .filterByFeatures();

      filteredMarkers = getMarkers(Filters.result);
      showPins(filteredMarkers);
    };
  };

  mapFilters.addEventListener('change', debounce(createFilterChangeHandler(), RERENDER_DELAY));
};
