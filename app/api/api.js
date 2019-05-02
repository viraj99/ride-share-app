import {
  LOGIN,
  RIDES,
  SCHEDULEDRIDES,
  APPROVEDRIDES,
  SETTINGS,
  LOGOUT,
  AVAILABILITIES,
  driverRides,
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

  getAvailabilities() {
    // change this with the api wrapper
    return fetch(AVAILABILITIES, {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        token: '',
      },
    });
  },

  logout(token) {
    return apiWrapper({
      path: LOGOUT,
      method: 'POST',
      headers: { token },
    }).then(res => res.json());
  },
  getSettingInfo(token) {
    return apiWrapper({
      path: SETTINGS,
      headers: { token },
    }).then(res => res.json());
  },
  updateSettingsInfo(data, token) {
    return apiWrapper({
      path: SETTINGS,
      headers: { token },
      body: data,
      method: 'PUT',
    }).then(res => res.json());
  },
};
