import { City, WeatherData } from "../../utils/types";
import { CircleButton } from "../Button/CustomizedButton";
import { Card } from "../Card/Card";
import { WeatherImage } from "../WeatherImage/WeatherImage";
import ClearIcon from "@mui/icons-material/Clear";
import "./CityBlock.css";
import { useDeleteCity } from "../../hooks/useDeleteCity";
import { useAuthContext } from "../../hooks/useAuthContext";

const CityBlock = (props: {
  city: City;
  data: WeatherData;
  isSelected: boolean;
  onSelect: (data: WeatherData) => void;
}): JSX.Element => {
  const { state: userValue } = useAuthContext();

  const time = new Date(props.data.location.localtime).toLocaleTimeString(
    navigator.language,
    {
      hour: "2-digit",
      minute: "2-digit",
    }
  );

  const deleteMutationRes = useDeleteCity();

  const handleRemoveCity = (): void => {
    deleteMutationRes.mutateAsync({
      _id: props.city._id,
      cityName: props.data.location.name,
      userValue: userValue,
    });
  };

  return (
    <Card isSelected={props.isSelected} class="city">
      <div className="city-block" onClick={() => props.onSelect(props.data)}>
        <WeatherImage
          data={props.data.current.condition}
          isDay={props.data.current.is_day ? true : false}
          type="forecast"
        />
        <div className="city-block-description">
          <div className="city-block-description__name">
            {props.data.location.name}
          </div>
          <div className="city-block-description__time">{time}</div>
        </div>
        <div className="city-block-temp">
          {`${Math.round(props.data.current.temp_c)}°C`}
        </div>
        <CircleButton>
          <ClearIcon onClick={handleRemoveCity} />
        </CircleButton>
      </div>
    </Card>
  );
};

export default CityBlock;
