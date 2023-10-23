import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import formSlice from './formSlice';

const store = configureStore({
  reducer: {
    formSlice
  }
});

export default store;

export type RootState = ReturnType<typeof store.getState>
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
