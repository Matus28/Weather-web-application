import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { UserState } from "../context/AuthContext";
import { useSnackBar } from "../context/SnackbarContext";

interface CityData {
  cityName: string;
  userValue: UserState;
  isDefault: boolean;
}

export const usePutDefaultCity = () => {
  const { showSnackBar } = useSnackBar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (value: CityData) => {
      try {
        const { data } = await axios.put(
          `${import.meta.env.VITE_API_URL}/api/cities/default`,
          value,
          {
            headers: {
              Authorization: `Bearer ${value.userValue.user?.token}`,
            },
            validateStatus(status) {
              return status === 200;
            },
          }
        );
        return data;
      } catch (error: unknown) {}
    },
    onError: (error: Error) => {
      console.log(error);
      showSnackBar("Default city could not be set!", "error");
    },
    onSuccess: () => {
      showSnackBar("Default city successfully changed.", "success");
      queryClient.invalidateQueries(["default-city"]);
    },
  });
};
