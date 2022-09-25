import { configureStore } from '@reduxjs/toolkit'
import userReducer from './userSlice';
import homeReducer from 'features/Home/homeSlice';

const rootReducer = {
  user: userReducer,
  home: homeReducer
}

const store = configureStore({ reducer: rootReducer })

export default store;