import {
  LOGIN,
  RIDES,
  SETTINGS,
  LOGOUT,
  RIDER,
  AVAILABILITIES,
  REGISTER,
  VEHICLE,
  VEHICLES,
  ORGANIZATIONS,
} from '../utils/urls';
import apiWrapper from './apiWrapper';
//TODO get the ride id not the rider id from the API to accept the correct response
export default {
  // ex. of how the post and etc. requests can be written
  login(email, password) {
    console.log("data within api login: ", email)
    console.log("data within api login: ", password)
    return apiWrapper({
      path: LOGIN,
      body: { email, password },
      method: 'POST',
    }).then(res => { return res.json() });
  },
  getRides(token) {
    return apiWrapper({
      path: RIDES,
      token,
    }).then(res => res.json());
  },
  getRider(id, token) {
    return apiWrapper({
      path: RIDER,
      params: `/${id}`,
      token,
    }).then(res => res.json());
  },
  getDriver(token){
    return apiWrapper({
      path: REGISTER,
      method: 'GET',
      token,
    }).then(res => res.json());
  },
  //////////////////////////////////
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
  pickUpRide(id,token){
    return apiWrapper({
      path: RIDES,
      params: `/${id}/picking-up`,
      method: 'POST',
      token,
    }).then(res => res.json());
  },
  dropOffRide(id,token) {
    return apiWrapper({
      path: RIDES,
      params: `/${id}/dropping-off`,
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
  getAvailabilities(token) {
    return apiWrapper({
      path: AVAILABILITIES,
      method: 'GET',
      token,
    }).then(res => res.json());
  },
  deleteAvailability(token, eventID) {
    return apiWrapper({
      path: AVAILABILITIES,
      params: eventID,
      method: 'DELETE',
      token,
    })
  },
  editAvailability(token, eventID, userEntries, recurring, endDate) {
    let recurringParsed = JSON.parse(recurring)
    if (recurring === 'true') {
      let startDateArray = userEntries.start_time.split(" ")
      let startDate = startDateArray[0]
      const availability = {
        "start_date": startDate,
        "end_date": endDate,
        "start_time": userEntries.start_time,
        "end_time": userEntries.end_time,
        "is_recurring": recurringParsed,
        "location_id": userEntries.location_id,
        "id": eventID,
      }
      return apiWrapper({
        path: AVAILABILITIES,
        token,
        body: availability,
        method: 'PUT',
        params: eventID,
      }).then(res => console.log(res.json()));
    } else {
      let avail = userEntries
      avail = {
        "start_date": avail.start_time,
        "end_date": avail.end_time,
        "start_time": avail.start_time,
        "end_time": avail.end_time,
        "is_recurring": recurringParsed,
        "location_id": userEntries.location_id,
        "id": eventID,
      }
      return apiWrapper({
        path: AVAILABILITIES,
        token,
        body: avail,
        method: 'PUT',
        params: eventID,
      }).then(res => console.log(res.json()));
    }
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
  updateSettingsDriver(data, token) {
    const driverData = {
     'driver':
      {
        'organization_id': data.organization_id,
        'first_name': data.first_name,
        'last_name': data.last_name,
        'email': data.email,
        'phone': data.phone,
        'radius': data.radius,
        'is_active': data.is_active,
      }  
    }
    return apiWrapper({
      path: SETTINGS,
      headers: { token },
      body: driverData,
      method: 'PUT',
    }).then(res => res.json());
  },
  updateSettingsVehicle(id, data, token) {
    const vehicleData = {
      'vehicle':{
        'car_make': data.car_make,
        'car_model': data.car_model,
        'car_color': data.car_color,
        'insurance_provider': data.insurance_provider,
      }
    }
    return apiWrapper({
      path: VEHICLES,
      headers: {token},
      body: vehicleData,
      method: 'PUT,'
    }).then(res => res.json());
  },
  getVehicleWithOutId(token){
    return apiWrapper({
      path: VEHICLE,
      method: 'GET',
      headers: {token},
    }).then(res => res.json());
  },
  getVehicle(id, token){
    return apiWrapper({
      path: VEHICLE,
      method: 'GET',
      params: `?id=${id}`,
      headers: {token},
    }).then(res => res.json());
  },
  getOrgs() {
    return apiWrapper({
      path: ORGANIZATIONS,
      method: 'GET',
    }).then(res => res.json());
  },
  createDriver(data) {
    const driver = {
      "driver": {
        "organization_id": data.driver.organization_id,
        "email": data.driver.email,
        "password": data.driver.password,
        "first_name": data.driver.first_name,
        "last_name": data.driver.last_name,
        "phone": data.driver.phone,
        "is_active": true,
        "radius": data.driver.radius,
      }
    }
    console.log("data to API: ", driver)
    return apiWrapper({
      path: REGISTER,
      method: 'POST',
      headers: {
        'Accept': 'application/json',
      },
      body: driver,
    })
      .then(res => res.json())
  },
  createVehicle(vehicleData, token) {
    const vehicle = {
      "vehicle": {
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
    console.log("token to carReg API: ", token)
    return apiWrapper({
      path: VEHICLES,
      token,
      body: vehicle,
      method: 'POST',
    }).then(res => console.log(res.json()));
  },
  createAvailability(availData, recurring, endDate, token) {
    console.log("before parsing: ", recurring)
    console.log("before parsing it's a :", typeof recurring)
    let recurringParsed = JSON.parse(recurring)
    console.log("after parse: ", recurringParsed)
    console.log("after parsing it's a: ", typeof recurringParsed)
    if (recurring === 'true') {
      let startDateArray = availData.start_time.split(" ")
      let startDate = startDateArray[0]
      const availability = {
        "start_date": startDate,
        "end_date": endDate,
        "start_time": availData.start_time,
        "end_time": availData.end_time,
        "is_recurring": recurringParsed,
        "location_id": availData.location_id,
      }
      console.log("data to availReg API: ", availability)
      console.log("token to availReg API: ", token)
      return apiWrapper({
        path: AVAILABILITIES,
        token,
        body: availability,
        method: 'POST',
      }).then(res => console.log(res.json()));
    } else {
      const availability = {
        "start_time": availData.start_time,
        "end_time": availData.end_time,
        "is_recurring": recurringParsed,
        "location_id": availData.location_id,
      }
      return apiWrapper({
        path: AVAILABILITIES,
        token,
        body: availability,
        method: 'POST',
      }).then(res => console.log(res.json()));
    }
  }
};
