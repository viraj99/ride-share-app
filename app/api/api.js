import {
  RIDES, SCHEDULEDRIDES, APPROVEDRIDES, AVAILABILITIES,
} from '../utils/urls';

export default {
  getRides() {
    return fetch(RIDES).then(response => response.json());
  },
  getScheduledRides() {
    return fetch(SCHEDULEDRIDES).then(response => response.json());
  },
  getApprovedRides() {
    return fetch(APPROVEDRIDES).then(response => response.json());
  },
  getAvailabilities() {
    return fetch(AVAILABILITIES, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        token: '0ae2ccdc8765540021d8ec8d67c95f66',
      },
    }).then(response => response.json());
  },
};
