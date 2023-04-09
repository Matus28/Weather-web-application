export interface ConditionImages {
  condition: string;
  current: {
    day: string;
    night: string;
  };
  forecast: {
    day: string;
    night: string;
  };
}

export const ConditionImagesURL: ConditionImages[] = [
  {
    condition: "Sunny",
    current: {
      day: "../../../public/img/sunny.png",
      night: "../../../public/img/sunny.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/113.png",
      night: "../../../public/img/weatherIcons/night/113.png",
    },
  },
  {
    condition: "Clear",
    current: {
      day: "../../../public/img/sunny.png",
      night: "../../../public/img/night-clear.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/113.png",
      night: "../../../public/img/weatherIcons/night/113.png",
    },
  },
  {
    condition: "Partly cloudy",
    current: {
      day: "../../../public/img/cloudy-less.png",
      night: "../../../public/img/night-cloudy-less.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/116.png",
      night: "../../../public/img/weatherIcons/night/116.png",
    },
  },
  {
    condition: "Cloudy",
    current: {
      day: "../../../public/img/cloudy-more.png",
      night: "../../../public/img/night-cloudy-more.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/119.png",
      night: "../../../public/img/weatherIcons/night/119.png",
    },
  },
  {
    condition: "Overcast",
    current: {
      day: "../../../public/img/cloudy-more.png",
      night: "../../../public/img/night-cloudy-more.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/122.png",
      night: "../../../public/img/weatherIcons/night/122.png",
    },
  },
  {
    condition: "Mist",
    current: {
      day: "../../../public/img/fog.png",
      night: "../../../public/img/fog.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/143.png",
      night: "../../../public/img/weatherIcons/night/143.png",
    },
  },
  {
    condition: "Patchy rain possible",
    current: {
      day: "../../../public/img/rain-less.png",
      night: "../../../public/img/night-rain-less.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/176.png",
      night: "../../../public/img/weatherIcons/night/176.png",
    },
  },
  {
    condition: "Patchy snow possible",
    current: {
      day: "../../../public/img/snowing.png",
      night: "../../../public/img/snowing.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/179.png",
      night: "../../../public/img/weatherIcons/night/179.png",
    },
  },
  {
    condition: "Patchy sleet possible",
    current: {
      day: "../../../public/img/snow-less.png",
      night: "../../../public/img/night-snow-less.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/182.png",
      night: "../../../public/img/weatherIcons/night/182.png",
    },
  },
  {
    condition: "Patchy freezing drizzle possible",
    current: {
      day: "../../../public/img/snow-less.png",
      night: "../../../public/img/night-snow-less.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/185.png",
      night: "../../../public/img/weatherIcons/night/185.png",
    },
  },
  {
    condition: "Thundery outbreaks possible",
    current: {
      day: "../../../public/img/storm.png",
      night: "../../../public/img/storm.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/200.png",
      night: "../../../public/img/weatherIcons/night/200.png",
    },
  },
  {
    condition: "Blowing snow",
    current: {
      day: "../../../public/img/snowing.png",
      night: "../../../public/img/snowing.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/227.png",
      night: "../../../public/img/weatherIcons/night/227.png",
    },
  },
  {
    condition: "Blizzard",
    current: {
      day: "../../../public/img/snowing.png",
      night: "../../../public/img/snowing.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/230.png",
      night: "../../../public/img/weatherIcons/night/230.png",
    },
  },
  {
    condition: "Fog",
    current: {
      day: "../../../public/img/fog.png",
      night: "../../../public/img/fog.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/248.png",
      night: "../../../public/img/weatherIcons/night/248.png",
    },
  },
  {
    condition: "Freezing fog",
    current: {
      day: "../../../public/img/fog.png",
      night: "../../../public/img/fog.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/260.png",
      night: "../../../public/img/weatherIcons/night/260.png",
    },
  },
  {
    condition: "Patchy light drizzle",
    current: {
      day: "../../../public/img/fog.png",
      night: "../../../public/img/fog.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/263.png",
      night: "../../../public/img/weatherIcons/night/263.png",
    },
  },
  {
    condition: "Light drizzle",
    current: {
      day: "../../../public/img/fog.png",
      night: "../../../public/img/fog.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/266.png",
      night: "../../../public/img/weatherIcons/night/266.png",
    },
  },
  {
    condition: "Freezing drizzle",
    current: {
      day: "../../../public/img/fog.png",
      night: "../../../public/img/fog.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/281.png",
      night: "../../../public/img/weatherIcons/night/281.png",
    },
  },
  {
    condition: "Heavy freezing drizzle",
    current: {
      day: "../../../public/img/fog.png",
      night: "../../../public/img/fog.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/284.png",
      night: "../../../public/img/weatherIcons/night/284.png",
    },
  },
  {
    condition: "Patchy light rain",
    current: {
      day: "../../../public/img/rain-less.png",
      night: "../../../public/img/night-rain-less.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/293.png",
      night: "../../../public/img/weatherIcons/night/293.png",
    },
  },
  {
    condition: "Light rain",
    current: {
      day: "../../../public/img/rain-less.png",
      night: "../../../public/img/night-rain-less.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/296.png",
      night: "../../../public/img/weatherIcons/night/296.png",
    },
  },
  {
    condition: "Moderate rain at times",
    current: {
      day: "../../../public/img/rain-more.png",
      night: "../../../public/img/night-rain-more.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/299.png",
      night: "../../../public/img/weatherIcons/night/299.png",
    },
  },
  {
    condition: "Moderate rain",
    current: {
      day: "../../../public/img/rain-more.png",
      night: "../../../public/img/night-rain-more.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/302.png",
      night: "../../../public/img/weatherIcons/night/302.png",
    },
  },
  {
    condition: "Heavy rain at times",
    current: {
      day: "../../../public/img/cloudy-rain.png",
      night: "../../../public/img/cloudy-rain.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/305.png",
      night: "../../../public/img/weatherIcons/night/305.png",
    },
  },
  {
    condition: "Heavy rain",
    current: {
      day: "../../../public/img/cloudy-rain.png",
      night: "../../../public/img/cloudy-rain.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/308.png",
      night: "../../../public/img/weatherIcons/night/308.png",
    },
  },
  {
    condition: "Light freezing rain",
    current: {
      day: "../../../public/img/snow-less.png",
      night: "../../../public/img/night-snow-less.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/311.png",
      night: "../../../public/img/weatherIcons/night/311.png",
    },
  },
  {
    condition: "Moderate or heavy freezing rain",
    current: {
      day: "../../../public/img/snow-less.png",
      night: "../../../public/img/night-snow-less.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/314.png",
      night: "../../../public/img/weatherIcons/night/314.png",
    },
  },
  {
    condition: "Light sleet",
    current: {
      day: "../../../public/img/snow-less.png",
      night: "../../../public/img/night-snow-less.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/317.png",
      night: "../../../public/img/weatherIcons/night/317.png",
    },
  },
  {
    condition: "Moderate or heavy sleet",
    current: {
      day: "../../../public/img/snow-more.png",
      night: "../../../public/img/night-snow-more.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/320.png",
      night: "../../../public/img/weatherIcons/night/320.png",
    },
  },
  {
    condition: "Patchy light snow",
    current: {
      day: "../../../public/img/light-snow.png",
      night: "../../../public/img/night-light-snow.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/323.png",
      night: "../../../public/img/weatherIcons/night/323.png",
    },
  },
  {
    condition: "Light snow",
    current: {
      day: "../../../public/img/light-snow.png",
      night: "../../../public/img/night-light-snow.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/326.png",
      night: "../../../public/img/weatherIcons/night/326.png",
    },
  },
  {
    condition: "Patchy moderate snow",
    current: {
      day: "../../../public/img/snowing.png",
      night: "../../../public/img/snowing.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/329.png",
      night: "../../../public/img/weatherIcons/night/329.png",
    },
  },
  {
    condition: "Moderate snow",
    current: {
      day: "../../../public/img/snowing.png",
      night: "../../../public/img/snowing.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/332.png",
      night: "../../../public/img/weatherIcons/night/332.png",
    },
  },
  {
    condition: "Patchy heavy snow",
    current: {
      day: "../../../public/img/snowing.png",
      night: "../../../public/img/snowing.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/335.png",
      night: "../../../public/img/weatherIcons/night/335.png",
    },
  },
  {
    condition: "Heavy snow",
    current: {
      day: "../../../public/img/snowing.png",
      night: "../../../public/img/snowing.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/338.png",
      night: "../../../public/img/weatherIcons/night/338.png",
    },
  },
  {
    condition: "Ice pellets",
    current: {
      day: "../../../public/img/snowing.png",
      night: "../../../public/img/snowing.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/350.png",
      night: "../../../public/img/weatherIcons/night/350.png",
    },
  },
  {
    condition: "Light rain shower",
    current: {
      day: "../../../public/img/rain-less.png",
      night: "../../../public/img/night-rain-less.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/353.png",
      night: "../../../public/img/weatherIcons/night/353.png",
    },
  },
  {
    condition: "Moderate or heavy rain shower",
    current: {
      day: "../../../public/img/rain-more.png",
      night: "../../../public/img/night-rain-more.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/356.png",
      night: "../../../public/img/weatherIcons/night/356.png",
    },
  },
  {
    condition: "Torrential rain shower",
    current: {
      day: "../../../public/img/cloudy-rain.png",
      night: "../../../public/img/cloudy-rain.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/359.png",
      night: "../../../public/img/weatherIcons/night/359.png",
    },
  },
  {
    condition: "Light sleet showers",
    current: {
      day: "../../../public/img/snow-less.png",
      night: "../../../public/img/night-snow-less.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/362.png",
      night: "../../../public/img/weatherIcons/night/362.png",
    },
  },
  {
    condition: "Moderate or heavy sleet showers",
    current: {
      day: "../../../public/img/snow-more.png",
      night: "../../../public/img/night-snow-more.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/365.png",
      night: "../../../public/img/weatherIcons/night/365.png",
    },
  },
  {
    condition: "Light snow showers",
    current: {
      day: "../../../public/img/snowing.png",
      night: "../../../public/img/snowing.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/368.png",
      night: "../../../public/img/weatherIcons/night/368.png",
    },
  },
  {
    condition: "Moderate or heavy snow showers",
    current: {
      day: "../../../public/img/snowing.png",
      night: "../../../public/img/snowing.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/371.png",
      night: "../../../public/img/weatherIcons/night/371.png",
    },
  },
  {
    condition: "Light showers of ice pellets",
    current: {
      day: "../../../public/img/snowing.png",
      night: "../../../public/img/snowing.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/374.png",
      night: "../../../public/img/weatherIcons/night/374.png",
    },
  },
  {
    condition: "Moderate or heavy showers of ice pellets",
    current: {
      day: "../../../public/img/snowing.png",
      night: "../../../public/img/snowing.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/377.png",
      night: "../../../public/img/weatherIcons/night/377.png",
    },
  },
  {
    condition: "Patchy light rain with thunder",
    current: {
      day: "../../../public/img/sunny-storm.png",
      night: "../../../public/img/night-sunny-storm.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/386.png",
      night: "../../../public/img/weatherIcons/night/386.png",
    },
  },
  {
    condition: "Moderate or heavy rain with thunder",
    current: {
      day: "../../../public/img/storm.png",
      night: "../../../public/img/storm.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/389.png",
      night: "../../../public/img/weatherIcons/night/389.png",
    },
  },
  {
    condition: "Patchy light snow with thunder",
    current: {
      day: "../../../public/img/sunny-storm.png",
      night: "../../../public/img/night-sunny-storm.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/392.png",
      night: "../../../public/img/weatherIcons/night/392.png",
    },
  },
  {
    condition: "Moderate or heavy snow with thunder",
    current: {
      day: "../../../public/img/sunny-storm.png",
      night: "../../../public/img/night-sunny-storm.png",
    },
    forecast: {
      day: "../../../public/img/weatherIcons/day/395.png",
      night: "../../../public/img/weatherIcons/night/395.png",
    },
  },
];
