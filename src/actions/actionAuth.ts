import { loginWithEmailPassword, logoutFirebase } from "../database/provider";
import { useAppDispatch } from "../hooks/useRedux";
import { Password } from "primereact/password";
import { login, logout } from "../store/authSlice";

export const actionAuth = () => {
  const dispatch = useAppDispatch();

  const startLogin = async (email: string, password: string) => {
    const result = await loginWithEmailPassword({ email, password });
    console.log(result);

    if (!result.ok) return dispatch(logout());
    dispatch(login());
  };

  const startLogout = () => {
    logoutFirebase();
    dispatch(logout());
  };

  return {
    startLogin,
    startLogout,
  };
};
