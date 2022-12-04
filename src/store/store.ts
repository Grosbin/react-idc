import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./authSlice";
import { prayerReducer } from "./prayerSlice";
// import { useDispatch } from "react-redux";

const store = configureStore({
  reducer: {
    auth: authReducer.reducer,
    prayer: prayerReducer.reducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
// export const useAppDispatch: () => AppDispatch = useDispatch;
export default store;
