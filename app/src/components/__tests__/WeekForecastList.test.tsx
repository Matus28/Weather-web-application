import { WeekForecastList } from "../WeekForecast/WeekForecastList";
import { render } from "@testing-library/react";
import { testBAWeatherData } from "../../mockdata/data";

describe("WeekForecastList component test", () => {
  test("returns main div element for week forecast data", () => {
    const { container } = render(
      <WeekForecastList
        forecastData={testBAWeatherData.forecast.forecastday}
        days={7}
      />
    );
    const mainDiv = container.getElementsByClassName("week-forecast-list")[0];
    expect(mainDiv).toBeDefined();
  });

  test("returns 7 div elements representing forecast for every day week", () => {
    const { container } = render(
      <WeekForecastList
        forecastData={testBAWeatherData.forecast.forecastday}
        days={7}
      />
    );
    const forecastList =
      container.getElementsByClassName("week-forecast-list")[0];
    expect(forecastList).toBeDefined();
    expect(forecastList.childNodes.length).toBe(7);
  });

  test("returns 3 div elements representing forecast", () => {
    const { container } = render(
      <WeekForecastList
        forecastData={testBAWeatherData.forecast.forecastday}
        days={3}
      />
    );
    const forecastList =
      container.getElementsByClassName("week-forecast-list")[0];
    expect(forecastList).toBeDefined();
    expect(forecastList.childNodes.length).toBe(3);
  });
});
