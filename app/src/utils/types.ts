export interface WeatherCondition {
  code: number
  icon: string
  text: string
}

export interface ForecastHour {
  chance_of_rain: number
  chance_of_snow: number
  cloud: number
  condition: WeatherCondition
  dewpoint_c: number
  dewpoint_f: number
  feelslike_c: number
  feelslike_f: number
  gust_kph: number
  gust_mph: number
  heatindex_c: number
  heatindex_f: number
  humidity: number
  is_day: number
  precip_in: number
  precip_mm: number
  pressure_in: number
  pressure_mb: number
  temp_c: number
  temp_f: number
  time: string
  time_epoch: number
  uv: number
  vis_km: number
  vis_miles: number
  will_it_rain: number
  will_it_snow: number
  wind_degree: number
  wind_dir: string
  wind_kph: number
  wind_mph: number
  windchill_c: number
  windchill_f: number
}

export interface Forecast {
  astro: {
    is_moon_up: number
    is_sun_up: number
    moon_illumination: string
    moon_phase: string
    moonrise: string
    moonset: string
    sunrise: string
    sunset: string
  }
  date: string
  date_epoch: number
  day: {
    avghumidity: number
    avgtemp_c: number
    avgtemp_f: number
    avgvis_km: number
    avgvis_miles: number
    condition: WeatherCondition
    daily_chance_of_rain: number
    daily_chance_of_snow: number
    daily_will_it_rain: number
    daily_will_it_snow: number
    maxtemp_c: number
    maxtemp_f: number
    maxwind_kph: number
    maxwind_mph: number
    mintemp_c: number
    mintemp_f: number
    totalprecip_in: number
    totalprecip_mm: number
    totalsnow_cm: number
    uv: number
  }
  hour: ForecastHour[]
}

export interface WeatherData {
  location: {
    name: string
    region: string
    country: string
    lat: number
    lon: number
    tz_id: string
    localtime_epoch: number
    localtime: string
  }
  current: {
    last_updated_epoch: number
    last_updated: string
    temp_c: number
    temp_f: number
    is_day: number
    condition: WeatherCondition
    wind_mph: number
    wind_kph: number
    wind_degree: number
    wind_dir: string
    pressure_mb: number
    pressure_in: number
    precip_mm: number
    precip_in: number
    humidity: number
    cloud: number
    feelslike_c: number
    feelslike_f: number
    vis_km: number
    vis_miles: number
    uv: number
    gust_mph: number
    gust_kph: number
  }
  forecast: {
    forecastday: Forecast[]
  }
}

export interface AirConditionData {
  condition: string
  iconURL: string
  value: string | number
  variable: string
  unit: string
}

export interface User {
  email: string
  token: string
}

export interface City {
  _id: string
  cityName: string
  userValue: string
  isDefault: boolean
}
