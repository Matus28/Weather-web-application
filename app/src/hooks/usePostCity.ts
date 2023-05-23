import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { UserState } from "../context/AuthContext";
import { useSnackBar } from "../context/SnackbarContext";

interface CityData {
  cityName: string;
  userValue: UserState;
}

export const usePostCity = () => {
  const { showSnackBar } = useSnackBar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (value: CityData) => {
      try {
        const { data } = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/cities`,
          value,
          {
            headers: {
              Authorization: `Bearer ${value.userValue.user?.token}`,
            },
            validateStatus(status) {
              return status >= 200 && status < 300;
            },
          }
        );
        return data;
      } catch (error: unknown) {
        if (axios.isAxiosError(error)) {
          throw new Error(error.response?.data.error);
        }
        if (error instanceof Error) {
          throw new Error("Something went wrong");
        }
      }
    },
    onError: (error: Error) => {
      console.log(error);
      showSnackBar("Error ocurred, city not added!", "error");
    },
    onSuccess: (data) => {
      showSnackBar("City successfully added.", "success");
      queryClient.invalidateQueries(["cities"]);
    },
  });
};
