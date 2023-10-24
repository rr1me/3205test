import s from './Form.module.scss';
import React from 'react';
import InteractionZone from '../../widgets/InteractionZone/InteractionZone';
import AccountList from '../../entities/AccountList/AccountList';
import { useAppSelector } from '../../redux/store';

const Form = () => {
  const accounts = useAppSelector(s=>s.formSlice.accounts);

  return (
    <main className={s.wrapper}>
      <div className={s.inner} style={{ marginTop: accounts.length > 0 ? (27 + 28 * accounts.length) : 10 }}>
        <InteractionZone/>
        <AccountList/>
      </div>
    </main>
  );
};

export default Form;
