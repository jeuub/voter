import { configureStore, combineReducers } from '@reduxjs/toolkit'
import { userReducer } from './reducers';

const rootReducer = combineReducers({
  userReducer
})

export const setupStore = () => {
  return configureStore({
    reducer: rootReducer,
  })
}


export type RootState = ReturnType<typeof rootReducer>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppStore = ReturnType<typeof setupStore>

export type AppDispatch = AppStore['dispatch'];

export { register, login, loginAdmin, userReducer, userSlice } from './reducers'