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

const debounce = (func, wait, immediate) => {
  let timeout;
  return function() {
    const context = this;
    const args = arguments;
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      timeout = null;
      if (!immediate) {
        func.apply(context, args);
      }
    }, wait);
    if (immediate && !timeout) {
      func.apply(context, args);
    }
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

  const filterByType = (array, parameter, value) => value === 'any' ? array : array.filter((offer) => offer[parameter] === value);

  const filterByCapacity = (array, parameter, value) => value === 'any' ? array : array.filter((offer) => offer[parameter] === +value);

  const filterByPrice = (array, parameter, value) => value === 'any' ? array : array.filter((offer) => {
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
    if (features.length === 0) {
      return array;
    }
    else {
      return array.filter((offer) => JSON.stringify(featuresValues) === JSON.stringify(offer[parameter]));
    }
  };

  const Filters = {
    result: [],
    byType(value) {
      this.result = filterByType(this.result, 'type', value);
      return this;
    },
    byPrice(value) {
      this.result = filterByPrice(this.result, 'price', value);
      return this;
    },
    byRooms(value) {
      this.result = filterByCapacity(this.result, 'rooms', value);
      return this;
    },
    byGuests(value) {
      this.result = filterByCapacity(this.result, 'guests', value);
      return this;
    },
    byFeatures() {
      this.result = filterByCheckboxes(this.result, 'features');
      return this;
    },
  };


  const createFilterChangeHandler = () => {
    let filteredMarkers = [...markers];
    const filterValues = {
      type: 'any',
      price: 'any',
      rooms: 'any',
      guests: 'any',
    };

    return (evt) => {
      const { parameter, value } = getFilterParameter(evt);
      hidePins(filteredMarkers);

      Filters.result = [...offers];
      filterValues[parameter] = value;
      Filters
        .byType(filterValues.type)
        .byPrice(filterValues.price)
        .byRooms(filterValues.rooms)
        .byGuests(filterValues.guests)
        .byFeatures();

      filteredMarkers = getMarkers(Filters.result);
      showPins(filteredMarkers);
    };
  };

  mapFilters.addEventListener('change', debounce(createFilterChangeHandler(), RERENDER_DELAY), true);
};
