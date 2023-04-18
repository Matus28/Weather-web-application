import { WeatherImage } from "../WeatherImage/WeatherImage";
import { render, screen } from "@testing-library/react";

const testWeatherCondition = {
  text: "Sunny",
  icon: "//cdn.weatherapi.com/weather/64x64/day/113.png",
  code: 1000,
};

jest.mock("../../utils/selectImage", () => ({
  selectImage: jest.fn(() => "//localhost:3000/weather/64x64/day/113.png"),
}));

describe("WeatherImage component test", () => {
  test("returns image element with alternative text: Symbol image of weather", () => {
    render(
      <WeatherImage data={testWeatherCondition} isDay={true} type="current" />
    );
    const image = screen.getByAltText("Symbol image of weather");
    expect(image).toBeDefined();
  });

  test("returns image with correct url", () => {
    render(
      <WeatherImage data={testWeatherCondition} isDay={true} type="current" />
    );
    const image = screen.getByAltText(
      "Symbol image of weather"
    ) as HTMLImageElement;
    expect(image.src).toBe("http://localhost:3000/weather/64x64/day/113.png");
  });
});
