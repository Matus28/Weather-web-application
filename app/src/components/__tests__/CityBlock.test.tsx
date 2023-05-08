import CityBlock from "../CityBlock/CityBlock";
import { fireEvent, render, screen } from "@testing-library/react";
import { testBAWeatherData } from "../../mockdata/data";
import { City } from "../../utils/types";

const testCity: City = {
  _id: "001",
  cityName: "Bratislava",
  userValue: "1",
  isDefault: false,
};

testBAWeatherData.location.name = "Bratislava";
testBAWeatherData.location.localtime = "2023-04-16 12:00";
testBAWeatherData.current.temp_c = 13;

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

describe("CityBlock component test", () => {
  const handleSelect = jest.fn();
  const handleRemove = jest.fn();

  test("renders div element for city with name Bratislava with all information", () => {
    const { container } = render(
      <CityBlock
        city={testCity}
        data={testBAWeatherData}
        isSelected={false}
        onSelect={handleSelect}
        onRemove={handleRemove}
      />
    );
    const divCityBA = container.querySelector(".city-block");
    const divCityName = container.querySelector(
      ".city-block-description__name"
    );
    const divCityTime = container.querySelector(
      ".city-block-description__time"
    );
    const divCityTemp = container.querySelector(".city-block-temp");
    const imgWeather = screen.getByAltText(
      "Symbol image of weather"
    ) as HTMLImageElement;
    expect(divCityBA).toBeDefined();
    expect(divCityName?.textContent).toBe("Bratislava");
    expect(divCityTime?.textContent).toBe("12:00 PM");
    expect(divCityTemp?.textContent).toBe("13°C");
    expect(imgWeather).toBeDefined();
    expect(imgWeather).toBeDefined();
  });

  test("renders button element to delete city from the list", () => {
    const { container } = render(
      <CityBlock
        city={testCity}
        data={testBAWeatherData}
        isSelected={false}
        onSelect={handleSelect}
        onRemove={handleRemove}
      />
    );
    const buttonRemove = container.getElementsByTagName(
      "button"
    )[0] as HTMLButtonElement;
    expect(buttonRemove).toBeDefined();

    fireEvent.click(buttonRemove);
    expect(handleRemove).toHaveBeenCalledTimes(1);
  });

  test("renders city block element that can be selectable", () => {
    const { container } = render(
      <CityBlock
        city={testCity}
        data={testBAWeatherData}
        isSelected={true}
        onSelect={handleSelect}
        onRemove={handleRemove}
      />
    );
    const divCityCard = container.getElementsByClassName("card-body")[0];
    const divCityBlock = container.getElementsByClassName("city-block")[0];
    expect(divCityCard).toBeDefined();
    expect(divCityBlock).toBeDefined();

    fireEvent.click(divCityBlock);
    expect(handleSelect).toHaveBeenCalledTimes(1);
    expect(divCityCard.classList.contains("active")).toBeTruthy();
  });
});
