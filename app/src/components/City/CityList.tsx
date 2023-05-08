import { City, WeatherData } from "../../utils/types";
import CityBlock from "../CityBlock/CityBlock";
import { useDeleteCity } from "../../hooks/useDeleteCity";
import "./CityList.css";
import { useAuthContext } from "../../hooks/useAuthContext";

export const CityList = (props: {
  cities: City[];
  weatherData: WeatherData[];
  selected?: string;
  onSelect: (data: WeatherData) => void;
}): JSX.Element => {
  const { state: userValue } = useAuthContext();

  const deleteMutationRes = useDeleteCity();

  const handleRemoveCity = (cityId: string, cityName: string): void => {
    if (cityName === props.selected) {
      props.onSelect(props.weatherData[0]);
    }

    deleteMutationRes.mutateAsync({
      _id: cityId,
      cityName: cityName,
      userValue: userValue,
    });
  };

  return (
    <div className="city-list">
      {props.weatherData &&
        props.weatherData.map((element: WeatherData, index: number) => {
          return (
            <CityBlock
              key={index}
              city={
                props.cities.filter((city: City) =>
                  element.location.name
                    .toLowerCase()
                    .includes(city.cityName.toLowerCase())
                )[0]
              }
              data={element}
              isSelected={props.selected === element.location.name}
              onSelect={props.onSelect}
              onRemove={handleRemoveCity}
            />
          );
        })}
    </div>
  );
};
