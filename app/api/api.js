import {
  LOGIN,
  RIDES,
  SCHEDULEDRIDES,
  APPROVEDRIDES,
  SETTINGS,
  LOGOUT,
  AVAILABILITIES,
  driverRides,
  REGISTER,
  VEHICLES,
} from '../utils/urls';
import apiWrapper from './apiWrapper';

export default {
  // ex. of how the post and etc. requests can be written
  login(email, password) {
    console.log("data within api login: ", email)
    console.log("data within api login: ", password)
    return apiWrapper({
      path: LOGIN,
      body: {email, password},
      method: 'POST',
    }).then(res => {return res.json()});
  },

  getRides(token) {
    return apiWrapper({
      path: RIDES,
      params: driverRides,
      token,
    }).then(res => res.json());
  },
  acceptRide(id, token) {
    return apiWrapper({
      path: RIDES,
      params: `/${id}/accept`,
      method: 'POST',
      token,
    }).then(res => res.json());
  },
  completeRide(id, token) {
    return apiWrapper({
      path: RIDES,
      params: `/${id}/complete`,
      method: 'POST',
      token,
    }).then(res => res.json());
  },
  cancelRide(id, token) {
    return apiWrapper({
      path: RIDES,
      params: `/${id}/cancel`,
      method: 'POST',
      token,
    }).then(res => res.json());
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
      headers: {token},
    }).then(res => res.json());
  },
  getSettingInfo(token) {
    return apiWrapper({
      path: SETTINGS,
      headers: {token},
    }).then(res => res.json());
  },
  updateSettingsInfo(data, token) {
    return apiWrapper({
      path: SETTINGS,
      headers: {token},
      body: data,
      method: 'PUT',
    }).then(res => res.json());
  },

  getOrgs() {
    return fetch('https://ctd-rideshare.herokuapp.com/api/v1/organizations', {
      method: 'GET',
      headers: {
        Accept: 'application/json',
      },
    }).then(res => res.json());
  },

  createDriver(data, radius, orgID) {
    const driver = {
      "driver":{
        "organization_id": parseInt(orgID),	
	      "email": data.driver.email,
	      "password": data.driver.password,
        "first_name": data.driver.first_name,
        "last_name": data.driver.last_name,
        "phone": data.driver.phone,
        "is_active": true,
        "radius": parseInt(radius),
      }
    }

    console.log("data to API: ", driver)
    return apiWrapper({
      path: REGISTER,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body:driver,
    })
    .then(res => res.json())
  },

  createVehicle(vehicleData, token) {
    const vehicle = {    
        "vehicle":{
          "car_make": vehicleData.vehicle.car_make,
          "car_model": vehicleData.vehicle.car_model,
          "car_year": parseInt(vehicleData.vehicle.car_year),
          "car_color": vehicleData.vehicle.car_color,
          "car_plate": vehicleData.vehicle.car_plate,
          "seat_belt_num": parseInt(vehicleData.vehicle.seat_belt_num),
          "insurance_provider": vehicleData.vehicle.insurance_provider,
          "insurance_start": vehicleData.vehicle.insurance_start,
          "insurance_stop": vehicleData.vehicle.insurance_stop,
        }
    }
    console.log("data to carReg API: ", vehicle)
    return apiWrapper({
      path: VEHICLES,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        token,
      },
      body:vehicle,
    }).then(res => res.json());
  },
};
