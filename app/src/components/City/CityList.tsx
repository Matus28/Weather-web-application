import { City, WeatherData } from "../../utils/types";
import CityBlock from "../CityBlock/CityBlock";
import "./CityList.css";

export const CityList = (props: {
  cities: City[];
  weatherData: WeatherData[];
  selected: string;
  onSelect: (data: WeatherData) => void;
}): JSX.Element => {
  console.log(props.cities);
  console.log(props.weatherData);
  return (
    <div className="city-list">
      {props.weatherData &&
        props.weatherData.map((element: WeatherData, index: number) => {
          return (
            <CityBlock
              key={index}
              city={
                props.cities.filter(
                  (city: City) => city.cityName === element.location.name
                )[0]
              }
              data={element}
              isSelected={props.selected === element.location.name}
              onSelect={props.onSelect}
            />
          );
        })}
    </div>
  );
};
