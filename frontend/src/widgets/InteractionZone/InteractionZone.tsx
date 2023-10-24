import s from './InteractionZone.module.scss';
import store, { useAppDispatch, useAppSelector } from '../../redux/store';
import React, { ChangeEvent, FormEvent } from 'react';
import LabeledInput from '../../entities/LabeledInput/LabeledInput';
import LoadingButton from '../../entities/LoadingButton/LoadingButton';
import ErrorZone from '../../entities/ErrorZone/ErrorZone';
import { submitForm } from '../../redux/formThunk';
import { actions } from '../../redux/formSlice';

const { setEmail, setNumber } = actions;

const InteractionZone = () => {
  const dispatch = useAppDispatch();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(submitForm());
  };

  return (
    <form className={s.form} onSubmit={onSubmit}>
      <EmailInput/>
      <NumberInput/>
      <Button/>
      <ErrorZone/>
    </form>
  );
};

export default InteractionZone;

const getCurrentEmailField = () => store.getState().formSlice.email;

const EmailInput = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(s=>s.formSlice.errors.invalidEmail);

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(setEmail(e.target.value));

  return <LabeledInput error={error} label='Email *' defaultValue={getCurrentEmailField()} onChange={onEmailChange}/>;
};

const NumberInput = () => {
  const dispatch = useAppDispatch();
  const number = useAppSelector(s=>s.formSlice.number);

  const onNumberChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(setNumber(e.target.value));

  return <LabeledInput label='Number' value={number} onChange={onNumberChange}/>;
};

const Button = () => {
  const loading = useAppSelector(s=>s.formSlice.loading);

  return (
    <LoadingButton type='submit' loading={loading}>
			Submit
    </LoadingButton>
  );
};
