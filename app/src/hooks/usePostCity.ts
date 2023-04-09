import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { UserState } from "../context/AuthContext";

interface CityData {
  cityName: string;
  userValue: UserState;
}

export const usePostCity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (value: CityData) => {
      try {
        const { data } = await axios.post(`/api/cities`, value, {
          headers: {
            Authorization: `Bearer ${value.userValue.user?.token}`,
          },
          validateStatus(status) {
            return status === 200;
          },
        });
        return data;
      } catch (error: unknown) {}
    },
    onError: (error: Error) => {
      console.log(error);
    },
    onSuccess: () => {
      console.log("Success !!!");
      queryClient.invalidateQueries(["cities"]);
    },
  });
};
