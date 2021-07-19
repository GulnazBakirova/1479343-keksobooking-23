import {
  prices,
  RERENDER_DELAY,
  ERROR,
  ANY,
  LOW,
  MIDDLE,
  HIGH
} from './data.js';

import {
  mapFilters
} from './form.js';

import {
  getMarkers,
  hidePins,
  showPins
} from './map.js';

import {
  debounce
} from './util.js';

export const filterPins = (offers, markers) => {
  const getFilterParameter = (evt) => {
    const target = evt.target;
    return {
      parameter: target.name.replace(/housing-/, ''),
      value: target.value,
    };
  };

  const filterByType = (array, parameter, value) => value === ANY ? array : array.filter((offer) => offer[parameter] === value);

  const filterByCapacity = (array, parameter, value) => value === ANY ? array : array.filter((offer) => offer[parameter] === +value);

  const filterByPrice = (array, parameter, value) => value === ANY ? array : array.filter((offer) => {
    switch (value) {
      case LOW:
        return +offer[parameter] < prices.low;
      case HIGH:
        return +offer[parameter] > prices.high;
      case MIDDLE:
        return +offer[parameter] <= prices.high && +offer[parameter] >= prices.low;
      default:
        return ERROR;
    }
  });

  const filterByCheckboxes = (array, parameter) => {
    const features = [...mapFilters.querySelectorAll('input[type="checkbox"]:checked')];
    const featuresValues = features.map((feature) => feature.value);
    if (features.length === 0) {
      return array;
    }
    else {
      return array.filter((offer) => JSON.stringify(featuresValues) === JSON.stringify(offer[parameter]));
    }
  };

  const filters = {
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
      type: ANY,
      price: ANY,
      rooms: ANY,
      guests: ANY,
    };

    return (evt) => {
      const { parameter, value } = getFilterParameter(evt);
      hidePins(filteredMarkers);

      filters.result = [...offers];
      filterValues[parameter] = value;
      filters
        .byType(filterValues.type)
        .byPrice(filterValues.price)
        .byRooms(filterValues.rooms)
        .byGuests(filterValues.guests)
        .byFeatures();

      filteredMarkers = getMarkers(filters.result);
      showPins(filteredMarkers);
    };
  };

  mapFilters.addEventListener('change', debounce(createFilterChangeHandler(), RERENDER_DELAY), true);
};
