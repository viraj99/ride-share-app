import {
  LOGIN, RIDES, SCHEDULEDRIDES, APPROVEDRIDES, driverRides,
} from '../utils/urls';
import apiWrapper from './apiWrapper';

export default {
  // ex. of how the post and etc. requests can be written
  login(email, password) {
    return apiWrapper({
      path: LOGIN,
      body: { email, password },
      method: 'POST',
    }).then(res => res.json());
  },
  getRides(token) {
    return apiWrapper({
      path: RIDES,
      params: driverRides,
      headers: { token },
    }).then(res => res.json());
  },
  getScheduledRides() {
    return fetch(SCHEDULEDRIDES).then(response => response.json());
  },
  getApprovedRides() {
    return fetch(APPROVEDRIDES).then(response => response.json());
  },
};
