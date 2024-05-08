import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { login, logout } from "../store/authSlice";
import { auth as FirebaseAuth } from "../database/firebase";
import { useAppDispatch, useAppSelector } from "./useRedux";

export const useCheckAuth = () => {
  const { status } = useAppSelector(state => state.auth);
  const dispatch = useAppDispatch();

  useEffect(() => {
    onAuthStateChanged(FirebaseAuth, async user => {
      if (!user) return dispatch(logout());

      const { uid, email } = user;
      console.log("User", uid, email);
      dispatch(login());
    });
  }, []);

  return status;
};
