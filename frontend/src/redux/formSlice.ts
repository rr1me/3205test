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
    setEmail: (state, { payload }: {payload: string}) => {
      state.email = payload;
    },
    setNumber: (state, { payload: str }: {payload: string}) => {
      const strLength = str.length;
      if (str[strLength-1] === '-') {
        state.number = str.slice(0, strLength-1);
        return;
      }

      const digits = str.replace(/\D/g, '');
      const digitLength = digits.length;

      if (digits !== '' && digitLength > 2 && digitLength % 2 !== 0) {
        let formatted = str[0];

        for (let i = 2; i < digits.length; i += 2)
          formatted += digits.slice(i-1, i) + '-' + digits[i];

        state.number = formatted;
        return;
      }

      state.number = str;
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
