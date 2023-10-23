import { createSlice } from '@reduxjs/toolkit';
import { submitForm } from './formThunk';
import validate from '../shared/validate';

export type FormData = {
  email: string;
  number: string;
  loading: boolean;
  reject: boolean;
  errors: Errors;
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
  errors
};

const formSlice = createSlice({
  name: 'formSlice',
  initialState,
  reducers: {
    setEmail: (state, { payload }) => {
      state.email = payload;
    },
    setNumber: (state, { payload }) => {
      state.number = payload;
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
      .addCase(submitForm.rejected, state => {
        state.loading = false;
        if (state.reject) return;
        state.errors.internalError = true;
      })
      .addCase(submitForm.fulfilled, state => {
        state.loading = false;
      });
  }
});

export default formSlice.reducer;
export const actions = formSlice.actions;

export type ErrorType = 'invalidEmail' | 'internalError';
export type Errors = Record<ErrorType, boolean>;
