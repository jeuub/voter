import { AppDispatch } from "@store";
import { baseURL, CreatingPoll, Poll } from "@consts";
import { pollsSlice } from './polls-slice';
import axios from "axios";


export const createPoll = (poll: CreatingPoll) => async (dispatch: AppDispatch) => {
  try {
    dispatch(pollsSlice.actions.pollsFetching())
    const response: { data: Poll } = await axios.post(`${baseURL}/api/polls`, poll)

    dispatch(pollsSlice.actions.pollsAdd(response.data))
  } catch (e) {
    let message = 'Ошибка при создании опроса';
    if (e instanceof Error) message = e.message;
    dispatch(pollsSlice.actions.pollsFetchingError({ message }))
  }
};



export const getPolls = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(pollsSlice.actions.pollsFetching())

    const response: { data: Poll[] } = await axios.get(`${baseURL}/api/polls`)

    dispatch(pollsSlice.actions.pollsFetchingSuccess({ polls: response.data }))
  } catch (e) {
    let message = 'Ошибка получения опросов. Попробуйте позже';
    if (e instanceof Error) message = e.message;
    dispatch(pollsSlice.actions.pollsFetchingError({ message }))
  }
};