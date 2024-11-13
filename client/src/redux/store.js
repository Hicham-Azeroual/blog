import { configureStore } from "@reduxjs/toolkit";
import  userReducer  from "./user/userSclice.js";
export const store = configureStore({
  reducer: { user: userReducer },
});
