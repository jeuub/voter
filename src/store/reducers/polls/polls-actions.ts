import { AppDispatch } from "@store";
import { baseURL, CreatingPoll, Poll } from "@consts";
import { pollsSlice } from './polls-slice';
import axios from "axios";


export const createPoll = (poll: CreatingPoll) => async (dispatch: AppDispatch) => {
  try {
    dispatch(pollsSlice.actions.createPollFetching())
    const response: { data: Poll } = await axios.post(`${baseURL}/api/polls`, poll)

    dispatch(pollsSlice.actions.createPollSuccess(response.data))

    dispatch(pollsSlice.actions.pollsFetching())

    const responsePolls: { data: Poll[] } = await axios.get(`${baseURL}/api/polls`)

    dispatch(pollsSlice.actions.pollsFetchingSuccess({ polls: responsePolls.data }))
  } catch (e) {
    let message = 'Ошибка при создании опроса';
    dispatch(pollsSlice.actions.createPollError({ message }))
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

export const getPoll = (data: { id: string }) => async (dispatch: AppDispatch) => {

  try {
    const response: { data: Poll } = await axios.get(`${baseURL}/api/polls/${data.id}`)

    dispatch(pollsSlice.actions.setCurrentPoll({ poll: response.data }))

  } catch (e) {
  }
};

export const vote = (data: { question: string, options: string[], answer: string[], id: string }) => async (dispatch: AppDispatch) => {

  try {
    dispatch(pollsSlice.actions.votingFetching())

    await axios.post(`${baseURL}/api/polls/${data.id}`, data)

    dispatch(pollsSlice.actions.votingSuccess())

    const response: { data: Poll } = await axios.get(`${baseURL}/api/polls/${data.id}`)

    dispatch(pollsSlice.actions.setCurrentPoll({ poll: response.data }))

  } catch (e) {
    let message = 'Вы уже проголосовали. Отменить голос нельзя';
    dispatch(pollsSlice.actions.votingError({ message }))
  }
};