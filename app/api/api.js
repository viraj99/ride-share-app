import {
  LOGIN,
  RIDES,
  SCHEDULEDRIDES,
  APPROVEDRIDES,
  SETTINGS,
  LOGOUT,
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

//   getAvailabilities() {
//     return fetch(AVAILABILITIES, {
//       method: 'GET',
//       headers: {
//         Accept: 'application/json',
//         token: '0ae2ccdc8765540021d8ec8d67c95f66',
//       },

  getLogin(credentials) {
    const url = `${LOGIN}${credentials}`;
    return fetch(url, {
      method: 'POST',
      headers: HEADERS,
    }).then((response) => {
      console.log(response);
      return response.json();
    });
  },
  logout(tokenValue) {
    return fetch(LOGOUT, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: tokenValue,
      },
    }).then(response => response.json());
  },
  getSettingInfo(tokenValue) {
    return fetch(SETTINGS, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: tokenValue,
      },
    }).then(response => response.json());
  },
  updateSettingsInfo(tokenValue, data) {
    const updatedData = JSON.stringify(data);
    return fetch(SETTINGS, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        token: tokenValue,
      },
      body: updatedData,
    }).then(response => response.json());
  },
};
