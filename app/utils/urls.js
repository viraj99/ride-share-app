
export const apiBaseUrl = 'https://carma-ctd.herokuapp.com/api/v1/';
// paths
export const LOGIN = 'login';
export const RIDES = 'rides';
// params
export const driverRides = '?driver_specific=true';

// these need to be updated
export const LOGOUT = 'https://carma-ctd.herokuapp.com/api/v1/logout';
export const SETTINGS = 'https://carma-ctd.herokuapp.com/api/v1/drivers/';

// these don't work yet, status names are incorrect & params do not filter
export const SCHEDULEDRIDES = 'rides?status=matched';
export const APPROVEDRIDES = 'rides?status=approved';
