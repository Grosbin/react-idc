import {
  loginWithEmailPassword,
  logoutFirebase,
  resetPassword,
  addUserAdmin,
} from "../database/provider";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../database/firebase";
import { useAppDispatch } from "../hooks/useRedux";
import { login, logout } from "../store/authSlice";

export const actionAuth = () => {
  const dispatch = useAppDispatch();

  const startLogin = async (email: string, password: string) => {
    const result = await loginWithEmailPassword({ email, password });

    if (!result.ok) return dispatch(logout());
    dispatch(login());
  };

  const startLogout = () => {
    logoutFirebase();
    dispatch(logout());
  };

  const startResetPassword = (email: string) => {
    resetPassword(email);
  };

  const startAddUserAdmin = (email: string) => {
    addUserAdmin(email);
  };

  // buscar usuario por correo
  const startGetUser = async (email: string) => {
    const collectionRef = collection(db, `admin`);
    const docs = await getDocs(collectionRef);
    let validate: boolean = false;
    docs.forEach((doc) => {
      if (doc.data().email === email) validate = true;
    });

    return validate;
  };

  return {
    startLogin,
    startLogout,
    startResetPassword,
    startAddUserAdmin,
    startGetUser,
  };
};
