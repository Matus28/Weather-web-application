import * as React from "react";
import { BlueStyledButton } from "../components/Button/CustomizedButton";
import { CityList } from "../components/City/CityList";
import { SearchCityInput } from "../components/Input/SearchCityInput";
import Loading from "../components/Loading/Loading";
import { SelectedCity } from "../components/SelectedCity/SelectedCity";
import { useSnackBar } from "../context/SnackbarContext";
import { useAuthContext } from "../hooks/useAuthContext";
import { useCities } from "../hooks/useCities";
import { usePostCity } from "../hooks/usePostCity";
import { useWeatherAllCities } from "../hooks/useWeatherAllCities";
import { WeatherData } from "../utils/types";
import { useTitleContext } from "../context/TitleContext";
import "./Cities.css";

const Cities = (): JSX.Element => {
  const [searchValue, setSearchValue] = React.useState<string>("");
  const [selectedCity, setSelectedCity] = React.useState<WeatherData | null>(
    null
  );

  const { state: userValue } = useAuthContext();
  const { showSnackBar } = useSnackBar();

  const { data: cities, isLoading, isError } = useCities(userValue);
  const [...weatherData] = useWeatherAllCities(cities, userValue);
  const allLoaded = weatherData.every((query) => !query.isLoading);

  const postMutationRes = usePostCity();

  const contextTitle = useTitleContext();

  React.useEffect(() => {
    contextTitle?.setTitle("Cities");
  }, []);

  React.useEffect(() => {
    if (weatherData.length > 0) {
      if (!selectedCity) {
        setSelectedCity(weatherData[0].data ?? null);
      }

      for (const data of weatherData) {
        if (data.error instanceof Error) {
          showSnackBar(data.error.message, "error");
          break;
        }
      }
    }
  }, [weatherData]);

  // React.useEffect(() => {
  //   if (citiesData.error) {
  //     showSnackBar("Cities not found!", "error");
  //   }
  //   if (weatherData[0].error) {
  //     showSnackBar("Weather data not found", "error");
  //   }
  // }, [citiesData.error || weatherData[0].error]);

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const inputCityName = e.currentTarget.elements.namedItem(
      "city-name"
    ) as HTMLInputElement;

    const newCity =
      inputCityName.value.charAt(0).toUpperCase() +
      inputCityName.value.slice(1).toLowerCase();

    postMutationRes.mutateAsync({
      cityName: newCity,
      userValue: userValue,
    });

    setSearchValue("");
  };

  const changeSearchValueHandler = (newValue: string): void => {
    setSearchValue(newValue);
  };

  const handleSelect = (data: WeatherData): void => {
    setSelectedCity(data);
  };

  return (
    <div className="main-container">
      <form id="my-cities-form" onSubmit={onSubmitHandler}>
        <SearchCityInput
          value={searchValue}
          onChangeValue={changeSearchValueHandler}
        />
        <BlueStyledButton variant="text" type="submit" form="my-cities-form">
          Add
        </BlueStyledButton>
      </form>
      <div className="city-weather-container">
        {!allLoaded && <Loading />}
        {weatherData.length > 0 && allLoaded && (
          <CityList
            cities={cities ?? []}
            weatherData={weatherData.map(
              (element) => element.data as WeatherData
            )}
            selected={selectedCity?.location.name ?? ""}
            onSelect={handleSelect}
          />
        )}
        {weatherData.length > 0 && allLoaded && (
          <SelectedCity data={selectedCity} />
        )}
      </div>
    </div>
  );
};

export default Cities;
