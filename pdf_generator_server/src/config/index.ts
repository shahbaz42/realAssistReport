import * as dotEnv from 'dotenv';

if (process.env.NODE_ENV !== 'prod') {
  const configFile = `./.env.${process.env.NODE_ENV}`;
  dotEnv.config({ path: configFile });
} else {
  dotEnv.config();
}

export const CRIME_API_URL = process.env.CRIME_API_URL || 'https://api.usa.gov/crime/fbi/cde/arrest/state/AK/all?from=2015&to=2020&API_KEY=iiHnOKfno2Mgkt5AynpvPpUQTEyxE77jo1RU8PIv';
export const PORT = process.env.PORT || 3000;
export const DB_URI = process.env.DB_URI || '';
export const API_KEY = process.env.API_KEY || '';
export const DEPLOYED_URI = process.env.DEPLOYED_URI || '';

