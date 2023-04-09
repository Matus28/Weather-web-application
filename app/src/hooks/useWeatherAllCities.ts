import axios from "axios";
import { useQueries, useQuery, UseQueryResult } from "@tanstack/react-query";
import { City, WeatherData } from "../utils/types";
import { UserState } from "../context/AuthContext";
import { extractName } from "../utils/extractName";

export const useWeatherAllCities = (
  cities: City[] | undefined,
  userValue: UserState
): UseQueryResult<WeatherData, unknown>[] => {
  const citiesName = extractName(cities);
  return useQueries({
    queries: citiesName.map((city: string) => {
      return {
        queryKey: ["weather-city", city],
        queryFn: async (): Promise<WeatherData | any> => {
          try {
            const location: string = city;
            console.log(location);
            const result = await axios.get<WeatherData>(
              `/api/weather/${location}`,
              {
                headers: {
                  Authorization: `Bearer ${userValue.user?.token}`,
                },
                validateStatus(status) {
                  return status === 200;
                },
              }
            );
            console.log(result.data);
            return result.data;
          } catch (error: unknown) {
            console.log(error);
            if (axios.isAxiosError(error)) {
              throw new Error(error.response?.data.message);
            }
            if (error instanceof Error) {
              throw new Error("Something went wrong");
            }
          }
        },
        enabled: !!cities,
      };
    }),
  });
};
