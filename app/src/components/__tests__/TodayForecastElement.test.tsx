import { TodayForecastElement } from "../TodayForecast/TodayForecastElement";
import { render, screen } from "@testing-library/react";
import { testBAWeatherData } from "../../mockdata/data";

describe("TodayForecastElement component test", () => {
  test("render element with today forecast", () => {
    const { container } = render(
      <TodayForecastElement
        forecastHour={testBAWeatherData.forecast.forecastday[0].hour[0]}
      />
    );
    const divCard = container.getElementsByClassName(
      "card-body today-forecast-element"
    )[0];
    expect(divCard).toBeDefined();
  });

  test("returns div elements with main forecast information", () => {
    const { container } = render(
      <TodayForecastElement
        forecastHour={testBAWeatherData.forecast.forecastday[0].hour[0]}
      />
    );
    const divTime = container.getElementsByClassName(
      "today-forecast-element__time"
    )[0];
    const image = screen.getByAltText(
      "Symbol image of weather"
    ) as HTMLImageElement;
    const temp = container.getElementsByClassName(
      "week-forecast-element__temp"
    )[0];
    expect(divTime.textContent).toBe("12:00 AM");
    expect(image).toBeDefined();
    expect(temp.textContent).toBe("6°C");
  });
});
