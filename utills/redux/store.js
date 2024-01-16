import { configureStore } from "@reduxjs/toolkit";
import currentUserReducer from "./features/currentUserSlice";

export const store = configureStore({
  reducer: {
    currentUser: currentUserReducer,
  },
});
