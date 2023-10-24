import { createAsyncThunk } from '@reduxjs/toolkit';
import { RootState } from './store';
import axios, { AxiosResponse, CancelTokenSource } from 'axios';
import { getDigits, isNullOrEmpty } from '../shared/utils';

const URL = process.env.REACT_APP_API as string;

const currentRequest: { x: null | {req: Promise<AxiosResponse>, cancel: CancelTokenSource} } = { x: null };

export const submitForm = createAsyncThunk(
  'submit',
  async (_, thunkAPI) => {
    const { getState, rejectWithValue } = thunkAPI;
    const { loading, email, number } = (getState() as RootState).formSlice;

    if (!loading) return rejectWithValue('invalid');

    const source = axios.CancelToken.source();

    const r = axios.post(URL, {
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
