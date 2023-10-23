import { AxiosError, AxiosPromise } from 'axios';

export type ThunkApi = {getState: () => unknown, rejectWithValue: (s?: unknown) => void}

export const processRequest = async (request: Promise<AxiosPromise>, thunkApi: ThunkApi, data = undefined) => {
  try {
    const r = await request;
    return data ? data : r.data;
  } catch (e) {
    return thunkApi.rejectWithValue((e as AxiosError).message);
  }
};
