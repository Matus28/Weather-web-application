import * as React from 'react'
import { BlueStyledButton } from '../components/Button/CustomizedButton'
import { SearchCityInput } from '../components/Input/SearchCityInput'
import { useWeather } from '../hooks/useWeather'
import { useSnackBar } from '../context/SnackbarContext'
import CurrentWeather from '../components/CurrentWeather/CurrentWeather'
import { WeekForecast } from '../components/WeekForecast/WeekForecast'
import { TodayForecast } from '../components/TodayForecast/TodayForecast'
import { AirCondition } from '../components/AirCondition/AirCondition'
import { useAuthContext } from '../hooks/useAuthContext'
import { usePutDefaultCity } from '../hooks/usePutDefaultCity'
import { useDefaultCity } from '../hooks/useDefaultCity'
import { usePostCity } from '../hooks/usePostCity'
import Loading from '../components/Loading/Loading'
import './Home.css'
import { useTitleContext } from '../context/TitleContext'

const Home = (): JSX.Element => {
  const [city, setCity] = React.useState<string>('')
  const [searchValue, setSearchValue] = React.useState<string>('')

  const [checked, setChecked] = React.useState<boolean | null>(null)

  const { state: userValue } = useAuthContext()
  const { showSnackBar } = useSnackBar()

  const { data: defCity } = useDefaultCity(checked, userValue)
  const { data, isFetching, error } = useWeather(city, userValue)

  const contextTitle = useTitleContext()

  const putMutationRes = usePutDefaultCity()
  const postMutationRes = usePostCity()

  React.useEffect(() => {
    contextTitle?.setTitle('Home')
  }, [])

  React.useEffect(() => {
    if (defCity && (defCity?.cityName === city || city.length === 0)) {
      setCity(defCity.cityName)
      setChecked(true)
    } else {
      setChecked(false)
    }
  }, [defCity, city])

  React.useEffect(() => {
    if (error) {
      showSnackBar('Data for location not found!', 'error')
    }
  }, [error])

  const onSubmitHandler = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault()
    const inputCityName = e.currentTarget.elements.namedItem('city-name') as HTMLInputElement

    const newCity =
      inputCityName.value.charAt(0).toUpperCase() + inputCityName.value.slice(1).toLowerCase()

    setCity(newCity)
    setSearchValue('')
  }

  const changeSearchValueHandler = (newValue: string): void => {
    setSearchValue(newValue)
  }

  const handleCheckDefault = async (value: boolean): Promise<void> => {
    setChecked(value)

    await putMutationRes.mutateAsync({
      cityName: city,
      userValue: userValue,
      isDefault: value,
    })
  }

  const handleAddCity = (): void => {
    postMutationRes.mutateAsync({
      cityName: city,
      userValue: userValue,
    })
  }

  return (
    <div className='main-container'>
      <form id='city-form' onSubmit={onSubmitHandler}>
        <SearchCityInput value={searchValue} onChangeValue={changeSearchValueHandler} />
        <BlueStyledButton variant='text' type='submit' form='city-form'>
          Find
        </BlueStyledButton>
      </form>
      <div className='weather-cards'>
        <div className='weather-cards-main'>
          {isFetching && <Loading />}
          {data && (
            <CurrentWeather
              weatherData={data}
              isChecked={checked ?? false}
              onCheck={handleCheckDefault}
              onAddCity={handleAddCity}
            />
          )}
          {data && <WeekForecast forecastData={data.forecast.forecastday} />}
        </div>
        {data && <TodayForecast forecastData={data.forecast.forecastday[0]} />}
        {data && <AirCondition weatherData={data} />}
      </div>
    </div>
  )
}

export default Home
