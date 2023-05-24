import axios from 'axios'
import { useQueries, UseQueryResult } from '@tanstack/react-query'
import { City, WeatherData } from '../utils/types'
import { UserState } from '../context/AuthContext'
import { extractName } from '../utils/extractName'
import { useSnackBar } from '../context/SnackbarContext'

export const useWeatherAllCities = (
  cities: City[] | undefined,
  userValue: UserState,
): UseQueryResult<WeatherData, unknown>[] => {
  const { showSnackBar } = useSnackBar()
  const citiesName = extractName(cities)
  return useQueries({
    queries: citiesName.map((city: string) => {
      return {
        queryKey: ['weather-city', city],
        // eslint-disable-next-line
        queryFn: async (): Promise<WeatherData | any> => {
          try {
            const location: string = city
            const result = await axios.get<WeatherData>(
              `${import.meta.env.VITE_API_URL}/api/weather/${location}`,
              {
                headers: {
                  Authorization: `Bearer ${userValue.user?.token}`,
                },
                validateStatus(status) {
                  return status === 200
                },
              },
            )
            return result.data
          } catch (error: unknown) {
            console.log(error)
            showSnackBar('Forecast data could not be retrieved!', 'error')
            if (axios.isAxiosError(error)) {
              throw new Error(error.response?.data.message)
            }
            if (error instanceof Error) {
              throw new Error('Something went wrong')
            }
          }
        },
        enabled: !!cities,
      }
    }),
  })
}
