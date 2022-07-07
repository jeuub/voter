export { register, login, loginAdmin } from './user/user-actions';
export { createPoll, getPolls, getPoll, vote } from './polls/polls-actions';

export { default as userReducer, userSlice } from './user/user-slice'
export { default as techsReducer, techSlice } from './techs/tech-slice';
export { default as pollsReducer, pollsSlice } from './polls/polls-slice'