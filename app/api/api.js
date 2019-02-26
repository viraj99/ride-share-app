import { RIDES, HEADERS } from '../utils/urls';

export default {
  getRides() {
    return fetch(RIDES).then(response => response.json());
  },
};
