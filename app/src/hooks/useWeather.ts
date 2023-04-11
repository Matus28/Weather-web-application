import axios from "axios";
import { useQuery, UseQueryResult } from "@tanstack/react-query";
import { WeatherData } from "../utils/types";
import { UserState } from "../context/AuthContext";

export const useWeather = (
  city: string,
  userValue: UserState
): UseQueryResult<WeatherData, Error> => {
  return useQuery({
    queryKey: ["weather", city],
    queryFn: async (): Promise<WeatherData | unknown> => {
      try {
        const location: string = city;
        const result = await axios.get<WeatherData>(
          `${import.meta.env.VITE_API_URL}/api/weather/${location}`,
          {
            headers: {
              Authorization: `Bearer ${userValue.user?.token}`,
            },
            validateStatus(status) {
              return status === 200;
            },
          }
        );
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
    enabled: !!city && !!userValue,
  });
};
