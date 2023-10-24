import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkApi } from '../shared/processRequest';
import { RootState } from './store';
import axios, { AxiosResponse, CancelTokenSource } from 'axios';
import { getDigits, isNullOrEmpty } from '../shared/utils';

const currentRequest: { x: null | {req: Promise<AxiosResponse>, cancel: CancelTokenSource} } = { x: null };

export const submitForm = createAsyncThunk(
  'submit',
  async (_, thunkAPI: ThunkApi) => {
    const { getState, rejectWithValue } = thunkAPI;
    const { loading, email, number } = (getState() as RootState).formSlice;

    if (!loading) return rejectWithValue();

    const source = axios.CancelToken.source();

    const r = axios.post('http://localhost:3001', {
      email,
      number: isNullOrEmpty(number) ? undefined : getDigits(number)
    }, { cancelToken: source.token });

    if (currentRequest.x) currentRequest.x.cancel.cancel('New request');

    currentRequest.x = {
      req: r,
      cancel: source
    };

    try {
      return (await r).data;
    }
    catch (e) {
      return rejectWithValue((e as Error).message);
    }
  }
);
