import { RIDES, SCHEDULEDRIDES, APPROVEDRIDES } from '../utils/urls';

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
};
