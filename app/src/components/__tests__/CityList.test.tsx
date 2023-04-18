import { CityList } from "../City/CityList";
import { City, WeatherData } from "../../utils/types";
import { render, screen } from "@testing-library/react";
import { testBAWeatherData, testKEWeatherData } from "../../mockdata/data";

const testCities: City[] = [
  {
    _id: "001",
    cityName: "Bratislava",
    userValue: "1",
    isDefault: false,
  },
  {
    _id: "002",
    cityName: "Kosice",
    userValue: "1",
    isDefault: true,
  },
];

jest.mock("../../hooks/useAuthContext", () => {
  return {
    useAuthContext: jest.fn().mockReturnValue({
      state: { email: "test@gmail.com", token: "testtoken" },
    }),
  };
});

jest.mock("../../hooks/useDeleteCity", () => {
  return {
    __esModule: true,
    useDeleteCity: jest.fn().mockReturnValue({
      data: null,
      isLoading: true,
      isError: false,
      error: null,
    }),
  };
});

const testWeatherData: WeatherData[] = [testBAWeatherData, testKEWeatherData];

const handleSelect = jest.fn().mockReturnValue;

describe("CityList component test", () => {
  test("returns elements representing 2 cities (Bratislava, Kosice)", () => {
    const { container } = render(
      <CityList
        cities={testCities}
        weatherData={testWeatherData}
        onSelect={handleSelect}
      />
    );
    const divCityList = container.getElementsByClassName("card-body");
    expect(divCityList).toBeDefined();
    expect(divCityList.length).toBe(2);
  });

  test("returns elements where Bratislava is selected", () => {
    const { container } = render(
      <CityList
        cities={testCities}
        weatherData={testWeatherData}
        selected={"Bratislava"}
        onSelect={handleSelect}
      />
    );
    const divSelectedCity =
      container.getElementsByClassName("card-body active");
    const divCityName = divSelectedCity[0].getElementsByClassName(
      "city-block-description__name"
    )[0];
    expect(divSelectedCity).toBeDefined();
    expect(divSelectedCity.length).toBe(1);
    expect(divCityName.textContent).toBe("Bratislava");
  });

  test("returns elements where Kosice is not selected", () => {
    const { container } = render(
      <CityList
        cities={testCities}
        weatherData={testWeatherData}
        selected={"Bratislava"}
        onSelect={handleSelect}
      />
    );
    const divSelectedCity = container.getElementsByClassName("card-body");
    const divCityName: Element = divSelectedCity[1].getElementsByClassName(
      "city-block-description__name"
    )[0];
    expect(divSelectedCity).toBeDefined();
    expect(divSelectedCity.length).toBe(2);
    expect(divSelectedCity[1].classList.contains("active")).toBeFalsy();
    expect(divCityName.textContent).toBe("Kosice");
  });
});
