import { configureStore } from "@reduxjs/toolkit";
import userReducer from "@/app/redux/slices/user-slice";
import gameSessionReducer from "@/app/redux/slices/game-session-slice";

export const makeStore = () => {
  return configureStore({
    reducer: {
      user: userReducer,
      gameSession: gameSessionReducer,
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
