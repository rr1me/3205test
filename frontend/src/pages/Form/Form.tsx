import s from './Form.module.scss';
import LabeledInput from '../../entities/LabeledInput/LabeledInput';
import LoadingButton from '../../entities/LoadingButton/LoadingButton';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { actions } from '../../redux/formSlice';
import React, { ChangeEvent, FormEvent } from 'react';
import { submitForm } from '../../redux/formThunk';
import ErrorZone from '../../entities/ErrorZone/ErrorZone';

const { setEmail, setNumber } = actions;

const Form = () => {
  const dispatch = useAppDispatch();

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    dispatch(submitForm());
  };

  return (
    <main className={s.wrapper}>
      <form className={s.form} onSubmit={onSubmit}>
        <EmailInput/>
        <NumberInput/>
        <Button/>
        <ErrorZone />
      </form>
    </main>
  );
};

export default Form;

const EmailInput = () => {
  const dispatch = useAppDispatch();
  const error = useAppSelector(s=>s.formSlice.errors.invalidEmail);

  const onEmailChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(setEmail(e.target.value));

  return <LabeledInput error={error} label='Email *' onChange={onEmailChange}/>;
};

const NumberInput = () => {
  const dispatch = useAppDispatch();
  const number = useAppSelector(s=>s.formSlice.number);

  const onNumberChange = (e: ChangeEvent<HTMLInputElement>) => dispatch(setNumber(e.target.value));

  return <LabeledInput label='Number' value={number} onChange={onNumberChange}/>;
};

const Button = () => {
  const loading = useAppSelector(s=>s.formSlice.loading);

  const onButtonClick = (e: React.MouseEvent) => {
    if (loading) e.preventDefault();
  };

  return (
    <LoadingButton type='submit' loading={loading} onClick={onButtonClick}>
      Submit
    </LoadingButton>
  );
};
