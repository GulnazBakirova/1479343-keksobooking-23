import {
  prices,
  RERENDER_DELAY,
  ERROR,
  ANY,
  LOW,
  MIDDLE,
  HIGH,
  TYPE_FILTER,
  PRICE_FILTER,
  ROOMS_FILTER,
  GUESTS_FILTER,
  housing
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
  removeDebounce
} from './util.js';

const filterValues = {
  type: ANY,
  price: ANY,
  rooms: ANY,
  guests: ANY,
};

export const resetFilterValues = () => {
  filterValues.type = ANY;
  filterValues.price = ANY;
  filterValues.rooms = ANY;
  filterValues.guests = ANY;
};


export const filterPins = (offers, markers) => {
  const getFilterParameter = (evt) => {
    const target = evt.target;
    return {
      parameter: target.name.replace(housing, ''),
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

  const filterByCheckboxes = (array) => {
    const features = [...mapFilters.querySelectorAll('input[type="checkbox"]:checked')];
    const featuresValues = features.map((feature) => feature.value);
    if (features.length === 0) {
      return array;
    }
    return array.filter((advert) => {
      let isAllFeaturesInOffer = true;
      if (!advert.features || advert.features === 0) {
        return false;
      }
      for (let i = 0; i < featuresValues.length; i++) {
        if (!advert.features.includes(featuresValues[i])) {
          isAllFeaturesInOffer = false;
          break;
        }
      }
      return isAllFeaturesInOffer;

    });
  };

  const filters = {
    result: [],
    filtrateByType(value) {
      this.result = filterByType(this.result, TYPE_FILTER, value);
      return this;
    },
    filtrateByPrice(value) {
      this.result = filterByPrice(this.result, PRICE_FILTER, value);
      return this;
    },
    filtrateByRooms(value) {
      this.result = filterByCapacity(this.result, ROOMS_FILTER, value);
      return this;
    },
    filtrateByGuests(value) {
      this.result = filterByCapacity(this.result, GUESTS_FILTER, value);
      return this;
    },
    filtrateByFeatures() {
      this.result = filterByCheckboxes(this.result, 'features');
      return this;
    },
  };


  const createFilterChangeHandler = () => {
    let filteredMarkers = [...markers];
    return (evt) => {
      const { parameter, value } = getFilterParameter(evt);
      hidePins(filteredMarkers);

      filters.result = [...offers];
      filterValues[parameter] = value;
      filters
        .filtrateByType(filterValues.type)
        .filtrateByPrice(filterValues.price)
        .filtrateByRooms(filterValues.rooms)
        .filtrateByGuests(filterValues.guests)
        .filtrateByFeatures();

      filteredMarkers = getMarkers(filters.result);
      showPins(filteredMarkers);
    };
  };

  mapFilters.addEventListener('change', removeDebounce(createFilterChangeHandler(), RERENDER_DELAY), true);
};
