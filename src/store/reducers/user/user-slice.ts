import { UserType } from "@consts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type userState = {
  user: undefined | null | {
    username: string;
    id: string;
  }
  loading: boolean;
  error: string;
}
const initialState: userState = {
  loading: false,
  error: '',
  user: undefined,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userFetching(state) {
      state.loading = true;
    },

    userFetchingSuccess(state, action: PayloadAction<{ user: UserType }>) {
      state.loading = false;
      state.error = '';
      state.user = action.payload.user;
    },

    userFetchingError(state, action: PayloadAction<{ message: string }>) {
      state.loading = false;
      state.error = action.payload.message;
      state.user = null;
    },
    userLogout(state) {
      localStorage.removeItem('token');

      axios.defaults.headers.common["Authorization"] = '';

      state.user = null
    },
    removeError(state) {
      state.error = ''
    }
  }
});

export default userSlice.reducer