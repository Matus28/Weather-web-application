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

const handleSelect = jest.fn();

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
  test("renders div element for city with name Bratislava with all information", () => {
    const { container } = render(
      <CityBlock
        city={testCity}
        data={testBAWeatherData}
        isSelected={false}
        onSelect={handleSelect}
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
    const buttonDelete = container.getElementsByTagName(
      "button"
    )[0] as HTMLButtonElement;
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
      />
    );
    const buttonDelete = container.getElementsByTagName(
      "button"
    )[0] as HTMLButtonElement;
    expect(buttonDelete).toBeDefined();

    fireEvent.click(buttonDelete);
  });
});

// import { City, WeatherData } from "../../utils/types";
// import { CircleButton } from "../Button/CustomizedButton";
// import { Card } from "../Card/Card";
// import { WeatherImage } from "../WeatherImage/WeatherImage";
// import ClearIcon from "@mui/icons-material/Clear";
// import { useDeleteCity } from "../../hooks/useDeleteCity";
// import { useAuthContext } from "../../hooks/useAuthContext";

// const CityBlock = (props: {
//   city: City;
//   data: WeatherData;
//   isSelected: boolean;
//   onSelect: (data: WeatherData) => void;
// }): JSX.Element => {
//   const { state: userValue } = useAuthContext();

//   const time = new Date(props.data.location.localtime).toLocaleTimeString(
//     navigator.language,
//     {
//       hour: "2-digit",
//       minute: "2-digit",
//     }
//   );

//   const deleteMutationRes = useDeleteCity();

//   const handleRemoveCity = (): void => {
//     deleteMutationRes.mutateAsync({
//       _id: props.city._id,
//       cityName: props.data.location.name,
//       userValue: userValue,
//     });
//   };

//   return (
//     <Card isSelected={props.isSelected} class="city">
//       <div className="city-block" onClick={() => props.onSelect(props.data)}>
//         <WeatherImage
//           data={props.data.current.condition}
//           isDay={props.data.current.is_day ? true : false}
//           type="forecast"
//         />
//         <div className="city-block-description">
//           <div className="city-block-description__name">
//             {props.data.location.name}
//           </div>
//           <div className="city-block-description__time">{time}</div>
//         </div>
//         <div className="city-block-temp">
//           {`${Math.round(props.data.current.temp_c)}°C`}
//         </div>
//         <CircleButton>
//           <ClearIcon onClick={handleRemoveCity} />
//         </CircleButton>
//       </div>
//     </Card>
//   );
// };

// export default CityBlock;
