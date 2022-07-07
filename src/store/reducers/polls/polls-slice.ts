import { Poll, UserType } from "@consts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type pollsState = {
  polls: Poll[] | undefined;
  loading: boolean;
  error: string;
}
const initialState: pollsState = {
  polls: undefined,
  error: '',
  loading: false
}

export const pollsSlice = createSlice({
  name: 'polls',
  initialState,
  reducers: {
    pollsFetching(state) {
      state.loading = true;
    },

    pollsFetchingSuccess(state, action: PayloadAction<{ polls: Poll[] }>) {
      state.loading = false;
      state.error = '';
      state.polls = action.payload.polls;
    },

    pollsFetchingError(state, action: PayloadAction<{ message: string }>) {
      state.loading = false;
      state.error = action.payload.message;
      state.polls = [];
    },

    pollsAdd(state, action: PayloadAction<Poll>) {
      if (state.polls !== undefined) state.polls.push(action.payload)
    }

  }
});

export default pollsSlice.reducer