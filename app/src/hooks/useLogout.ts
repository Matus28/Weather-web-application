import { UserActionType } from "../context/AuthContext";
import { useAuthContext } from "./useAuthContext";

export const useLogout = () => {
  const { dispatch } = useAuthContext();

  const logout = (): void => {
    // Removes user from Local Storage
    localStorage.removeItem("user");

    // dispatch Logout action
    dispatch({
      type: UserActionType.LOGOUT,
      payload: { email: "", token: "" },
    });
  };

  return { logout };
};
