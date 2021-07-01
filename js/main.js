import {
  SIMILAR_ADVERT_COUNT,
  createAdvert
} from './data.js';

export const similarAdverts = new Array(SIMILAR_ADVERT_COUNT).fill(null).map(() => createAdvert());
