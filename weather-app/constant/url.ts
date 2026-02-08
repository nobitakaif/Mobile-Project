export const weatherImages = {
  'Partly cloudy': require('../assets/images/partlycloudy.png'),
  'Moderate rain': require('../assets/images/moderaterain.png'),
  'Patchy rain possible': require('../assets/images/moderaterain.png'),
  'Sunny': require('../assets/images/sun.png'),
  'Clear': require('../assets/images/sun.png'),
  'Overcast': require('../assets/images/cloud.png'),
  'Cloudy': require('../assets/images/cloud.png'),
  'Light rain': require('../assets/images/moderaterain.png'),
  'Moderate rain at times': require('../assets/images/moderaterain.png'),
  'Heavy rain': require('../assets/images/heavyrain.png'),
  'Heavy rain at times': require('../assets/images/heavyrain.png'),
  'Moderate or heavy freezing rain': require('../assets/images/heavyrain.png'),
  'Moderate or heavy rain shower': require('../assets/images/heavyrain.png'),
  'Moderate or heavy rain with thunder': require('../assets/images/heavyrain.png'),
  'other': require('../assets/images/moderaterain.png'),
} as const;

export type WeatherCondition =
  keyof typeof weatherImages;


  
export interface Location {
  name: string;
  region: string;
  country: string;
  lat: number;
  lon: number;
  tz_id: string;
  localtime: string;
  localtime_epoch: number;
}
export interface Condition {
  text: string;
  icon: string;
  code: number;
}

export interface CurrentWeather {
  last_updated: string;
  last_updated_epoch: number;

  temp_c: number;
  temp_f: number;

  feelslike_c: number;
  feelslike_f: number;

  wind_kph: number;
  wind_mph: number;
  wind_degree: number;
  wind_dir: string;

  gust_kph: number;
  gust_mph: number;

  pressure_mb: number;
  pressure_in: number;

  precip_mm: number;
  precip_in: number;

  humidity: number;
  cloud: number;

  is_day: number;
  uv: number;

  vis_km: number;
  vis_miles: number;

  heatindex_c: number;
  heatindex_f: number;

  dewpoint_c: number;
  dewpoint_f: number;

  windchill_c: number;
  windchill_f: number;

  condition?: Condition;

  // Solar / radiation fields (WeatherAPI extras)
  diff_rad: number;
  dni: number;
  gti: number;
  short_rad: number;
}

export interface Forecast {
  forecastday: ForecastDay[];
}

export interface ForecastDay {
  date: string;
  date_epoch: number;
  day: {
    maxtemp_c: number;
    maxtemp_f: number;
    mintemp_c: number;
    mintemp_f: number;
    avgtemp_c: number;
    avgtemp_f: number;
    condition: Condition;
  };
}

export interface WeatherResponse {
  location: Location;
  current: CurrentWeather;
  forecast: Forecast;
}


export const dummyWeatherData: WeatherResponse = {
  current: {
    cloud: 0,
    condition: {
      code: 1000,
      icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
      text: "Sunny",
    },
    dewpoint_c: 0,
    dewpoint_f: 32,
    diff_rad: 0,
    dni: 0,
    feelslike_c: 0,
    feelslike_f: 32,
    gti: 0,
    gust_kph: 0,
    gust_mph: 0,
    heatindex_c: 0,
    heatindex_f: 32,
    humidity: 0,
    is_day: 1,
    last_updated: "2026-01-01 00:00",
    last_updated_epoch: 0,
    precip_in: 0,
    precip_mm: 0,
    pressure_in: 29.92,
    pressure_mb: 1013,
    short_rad: 0,
    temp_c: 0,
    temp_f: 32,
    uv: 0,
    vis_km: 10,
    vis_miles: 6,
    wind_degree: 0,
    wind_dir: "N",
    wind_kph: 0,
    wind_mph: 0,
    windchill_c: 0,
    windchill_f: 32,
  },

  forecast: {
    forecastday: [],
  },

  location: {
    name: "Sample City",
    region: "Sample Region",
    country: "Sample Country",
    lat: 0,
    lon: 0,
    tz_id: "UTC",
    localtime: "2026-01-01 00:00",
    localtime_epoch: 0,
  },
};
