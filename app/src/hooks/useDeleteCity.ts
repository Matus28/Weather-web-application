import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { UserState } from "../context/AuthContext";

interface CityData {
  _id: string;
  cityName: string;
  userValue: UserState;
}

export const useDeleteCity = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (value: CityData) => {
      try {
        const { data } = await axios.delete(`/api/cities/${value._id}`, {
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
