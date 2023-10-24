import { createSlice } from '@reduxjs/toolkit';
import { submitForm } from './formThunk';
import validate from '../shared/validate';
import { dashNumberFormat, getDigits } from '../shared/utils';

type Account = {
  email: string,
  number: string;
}

export type FormData = {
  email: string;
  number: string;
  loading: boolean;
  reject: boolean;
  errors: Errors;
  accounts: Account[];
}

const errors: Errors = {
  invalidEmail: false,
  internalError: false
};

const initialState: FormData = {
  email: '',
  number: '',
  loading: false,
  reject: false,
  errors,
  accounts: []
};

const formSlice = createSlice({
  name: 'formSlice',
  initialState,
  reducers: {
    setEmail: (state, { payload }: {payload: string}) => {
      state.email = payload;
    },
    setNumber: (state, { payload: str }: {payload: string}) => {
      const strLength = str.length;
      if (str[strLength-1] === '-') {
        state.number = str.slice(0, strLength-1);
        return;
      }

      state.number = dashNumberFormat(str);
    },
    setLoading: state => {
      state.loading = !state.loading;
    }
  },
  extraReducers: b => {
    b
      .addCase(submitForm.pending, state => {
        state.loading = true;
        state.reject = !validate(state);
      })
      .addCase(submitForm.rejected, (state, { payload }) => {
        if (payload === 'New request') return;
        state.loading = false;
        if (state.reject) return;
        state.errors.internalError = true;
      })
      .addCase(submitForm.fulfilled, (state, { payload }: { payload: Account[] }) => {
        state.loading = false;
        state.accounts = payload;
      });
  }
});

export default formSlice.reducer;
export const actions = formSlice.actions;

export type ErrorType = 'invalidEmail' | 'internalError';
export type Errors = Record<ErrorType, boolean>;
