import { createSlice } from "@reduxjs/toolkit";
import { Session } from "next-auth";

type UserState = {
  credentials: Session["user"];
};

const initialState: UserState = {
  credentials: {
    id: "",
    name: "",
    email: "",
    token: "",
    premium: false,
  },
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      state.credentials = action.payload;
    },
    clearUser(state) {
      state.credentials = initialState.credentials;
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
