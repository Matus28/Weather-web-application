import { render } from "@testing-library/react";
import { AirCondition } from "../AirCondition/AirCondition";
import { testWeatherData } from "../../mockdata/data";

describe("tests AirCondition component", () => {
  test("should render element with the Title Wind speed", () => {
    const { container } = render(
      <AirCondition weatherData={testWeatherData} />
    );
    const title = container.getElementsByClassName(
      "air-condition-element__title"
    )[0];
    expect(title.textContent).toBe("Wind speed");
  });

  test("should render image element", () => {
    const { container } = render(
      <AirCondition weatherData={testWeatherData} />
    );
    const weatherIMG = container.querySelectorAll("img")[0] as HTMLImageElement;
    expect(weatherIMG.alt).toContain("Image of condition's symbol");
    expect(weatherIMG.src).toContain("http://localhost/[object%20Object]");
  });

  test("should render element with right wind speed value", () => {
    const { container } = render(
      <AirCondition weatherData={testWeatherData} />
    );

    const temp = container.querySelector(".air-condition-element__value");
    expect(temp?.textContent).toBe("3.6 km/h");
  });

  test("should render element with the Title Wind direction", () => {
    const { container } = render(
      <AirCondition weatherData={testWeatherData} />
    );
    const title = container.getElementsByClassName(
      "air-condition-element__title"
    )[1];
    expect(title.textContent).toBe("Wind direction");
  });

  test("should render image element", () => {
    const { container } = render(
      <AirCondition weatherData={testWeatherData} />
    );
    const weatherIMG = container.querySelectorAll("img")[1] as HTMLImageElement;
    expect(weatherIMG.alt).toContain("Image of condition's symbol");
    expect(weatherIMG.src).toContain("http://localhost/[object%20Object]");
  });

  test("should render element with right wind direction", () => {
    const { container } = render(
      <AirCondition weatherData={testWeatherData} />
    );

    const temp = container.querySelectorAll(".air-condition-element__value")[1];
    expect(temp?.textContent).toBe("WSW ");
  });

  test("should render element with the Title Real feel", () => {
    const { container } = render(
      <AirCondition weatherData={testWeatherData} />
    );
    const title = container.getElementsByClassName(
      "air-condition-element__title"
    )[2];
    expect(title.textContent).toBe("Real feel");
  });

  test("should render image element", () => {
    const { container } = render(
      <AirCondition weatherData={testWeatherData} />
    );
    const weatherIMG = container.querySelectorAll("img")[2] as HTMLImageElement;
    expect(weatherIMG.alt).toContain("Image of condition's symbol");
    expect(weatherIMG.src).toContain("http://localhost/[object%20Object]");
  });

  test("should render element with right real feel temperature", () => {
    const { container } = render(
      <AirCondition weatherData={testWeatherData} />
    );

    const temp = container.querySelectorAll(".air-condition-element__value")[2];
    expect(temp?.textContent).toBe("13.2 °C");
  });

  test("should render element with the Title UV Index", () => {
    const { container } = render(
      <AirCondition weatherData={testWeatherData} />
    );
    const title = container.getElementsByClassName(
      "air-condition-element__title"
    )[3];
    expect(title.textContent).toBe("UV Index");
  });

  test("should render image element", () => {
    const { container } = render(
      <AirCondition weatherData={testWeatherData} />
    );
    const weatherIMG = container.querySelectorAll("img")[2] as HTMLImageElement;
    expect(weatherIMG.alt).toContain("Image of condition's symbol");
    expect(weatherIMG.src).toContain("http://localhost/[object%20Object]");
  });

  test("should render element with right UV index", () => {
    const { container } = render(
      <AirCondition weatherData={testWeatherData} />
    );

    const temp = container.querySelectorAll(".air-condition-element__value")[3];
    expect(temp?.textContent).toBe("5 ");
  });

  test("should render element with the Title Humidity", () => {
    const { container } = render(
      <AirCondition weatherData={testWeatherData} />
    );
    const title = container.getElementsByClassName(
      "air-condition-element__title"
    )[4];
    expect(title.textContent).toBe("Humidity");
  });

  test("should render image element", () => {
    const { container } = render(
      <AirCondition weatherData={testWeatherData} />
    );
    const weatherIMG = container.querySelectorAll("img")[4] as HTMLImageElement;
    expect(weatherIMG.alt).toContain("Image of condition's symbol");
    expect(weatherIMG.src).toContain("http://localhost/[object%20Object]");
  });

  test("should render element with right Humidity value", () => {
    const { container } = render(
      <AirCondition weatherData={testWeatherData} />
    );

    const temp = container.querySelectorAll(".air-condition-element__value")[4];
    expect(temp?.textContent).toBe("33 %");
  });
});
