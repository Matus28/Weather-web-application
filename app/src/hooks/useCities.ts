import axios from "axios";
import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { UserState } from "../context/AuthContext";
import { City } from "../utils/types";

export const useCities = (
  userValue: UserState
): UseQueryResult<City[], Error> => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["cities", userValue],
    queryFn: async (): Promise<City[] | unknown> => {
      try {
        const result = await axios.get<City[]>(`/api/cities`, {
          headers: {
            Authorization: `Bearer ${userValue.user?.token}`,
          },
          validateStatus(status) {
            return status === 200;
          },
        });
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
    enabled: !!userValue,
    onSuccess: () => {
      queryClient.invalidateQueries(["weather-city"]);
    },
  });
};
