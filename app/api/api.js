import {
  RIDES,
  SCHEDULEDRIDES,
  APPROVEDRIDES,
  LOGIN,
  HEADERS,
  SETTINGS,
  LOGOUT,
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
