import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { UserActionType } from "../context/AuthContext";
import { useAuthContext } from "./useAuthContext";

export interface FetchUser {
  email: string;
  token: string;
  error?: Error;
}

export interface FetchData {
  email: string;
  password: string;
}

export const useLogin = () => {
  const { dispatch } = useAuthContext();
  return useMutation({
    mutationFn: async (value: FetchData) => {
      try {
        const { data } = await axios.post(
          `${process.env.BACKEND_URL}/api/user/login`,
          value,
          {
            validateStatus(status) {
              return status === 200;
            },
          }
        );
        return data as FetchUser;
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
    },
    onSuccess: (data) => {
      if (data) {
        localStorage.setItem("user", JSON.stringify(data));
        dispatch({ type: UserActionType.LOGIN, payload: data });
        console.log("Success !!!");
      }
    },
  });
};
