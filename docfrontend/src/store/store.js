import { configureStore } from "@reduxjs/toolkit";
import userAuthReducer from "./userAuthslice"

const store = configureStore({
  reducer: {
    userAuth:userAuthReducer,
  },
});

export default store;
