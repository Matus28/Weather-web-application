import { WeekForecast } from "../WeekForecast/WeekForecast";
import { render } from "@testing-library/react";
import { testBAWeatherData } from "../../mockdata/data";

describe("WeekForecast element test", () => {
  test("returns main div for week forecast", () => {
    const { container } = render(
      <WeekForecast forecastData={testBAWeatherData.forecast.forecastday} />
    );
    const mainDiv = container.getElementsByClassName(
      "card-body week-forecast"
    )[0];
    expect(mainDiv).toBeDefined();
  });

  test("returns forecast elements for every day of the week (7 elements)", () => {
    const { container } = render(
      <WeekForecast forecastData={testBAWeatherData.forecast.forecastday} />
    );
    const weekForecast =
      container.getElementsByClassName("week-forecast-list")[0];
    expect(weekForecast.childNodes.length).toBe(7);
  });
});
