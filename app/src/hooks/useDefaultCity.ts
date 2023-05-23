import axios from "axios";
import {
  useQuery,
  useQueryClient,
  UseQueryResult,
} from "@tanstack/react-query";
import { UserState } from "../context/AuthContext";
import { City } from "../utils/types";
import { useSnackBar } from "../context/SnackbarContext";

export const useDefaultCity = (
  checked: boolean | null,
  userValue: UserState
): UseQueryResult<City | null, Error> => {
  const queryClient = useQueryClient();
  return useQuery({
    queryKey: ["default-city", userValue],
    queryFn: async (): Promise<City | unknown> => {
      try {
        const result = await axios.get<string[]>(
          `${import.meta.env.VITE_API_URL}/api/cities/default`,
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
    enabled: !!userValue || !!checked,
    onSuccess: () => {
      queryClient.invalidateQueries(["weather-city"]);
    },
  });
};
