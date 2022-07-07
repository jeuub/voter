import { Poll, UserType } from "@consts";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type pollsState = {
  polls: Poll[] | undefined;
  loading: boolean;
  error: string;
  votingLoading: boolean;
  voatingError: string;
  currentPoll: Poll | undefined;
  createPollLoading: boolean;
  createPollError: string;
  createPollSuccess: boolean;
}

const initialState: pollsState = {
  polls: undefined,
  error: '',
  loading: false,
  votingLoading: false,
  voatingError: '',
  currentPoll: undefined,
  createPollLoading: false,
  createPollError: '',
  createPollSuccess: false,
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
    },

    votingFetching(state) {
      state.loading = true
    },

    votingSuccess(state) {
      state.votingLoading = false
      state.voatingError = ''
    },

    votingError(state, action: PayloadAction<{ message: string }>) {
      state.votingLoading = false
      state.voatingError = action.payload.message
    },

    setCurrentPoll(state, action: PayloadAction<{ poll: Poll }>) {
      state.currentPoll = action.payload.poll
    },
    hideVotingError(state) {
      state.voatingError = ''
    },

    createPollFetching(state) {
      state.createPollLoading = true
    },
    createPollSuccess(state, action: PayloadAction<Poll>) {
      state.createPollLoading = false
      // if (state.polls !== undefined) state.polls.push(action.payload)
      state.createPollSuccess = true;
      state.createPollError = ''
    },
    createPollError(state, action: PayloadAction<{ message: string }>) {
      state.createPollLoading = false
      state.createPollError = action.payload.message
    },
    hideCreatePollError(state) {
      state.createPollError = ''
    },
    removeCreatePollSuccess(state) {
      state.createPollSuccess = false
    }
  }
});

export default pollsSlice.reducer