import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApi } from '../shared/processRequest';
import { RootState } from './store';

export const submitForm = createAsyncThunk(
  'submit',
  async (_, thunkAPI: ThunkApi) => {
    const { getState, rejectWithValue } = thunkAPI;
    const reject = (getState() as RootState).formSlice.reject;

    if (reject) return rejectWithValue();

    await new Promise(x => setTimeout(x, 500));
    return rejectWithValue();
  }
);
