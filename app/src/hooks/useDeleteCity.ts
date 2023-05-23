import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { UserState } from "../context/AuthContext";
import { useSnackBar } from "../context/SnackbarContext";

interface CityData {
  _id: string;
  cityName: string;
  userValue: UserState;
}

export const useDeleteCity = () => {
  const { showSnackBar } = useSnackBar();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (value: CityData) => {
      try {
        const { data } = await axios.delete(
          `${import.meta.env.VITE_API_URL}/api/cities/${value._id}`,
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
      showSnackBar("City could not be deleted.", "error");
    },
    onSuccess: () => {
      showSnackBar("City successfully deleted.", "success");
      queryClient.invalidateQueries(["cities"]);
    },
  });
};
