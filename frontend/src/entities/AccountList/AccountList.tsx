import s from './AccountList.module.scss';
import { useAppSelector } from '../../redux/store';
import { Fragment } from 'react';
import { dashNumberFormat } from '../../shared/utils';

const AccountList = () => {
  const accounts = useAppSelector(s=>s.formSlice.accounts);

  return (
    <section className={s.tableWrapper} style={ accounts.length > 0 ? {height: 'auto', opacity: 1} : undefined}>
      <p>Email</p>
      <p>Number</p>
      {accounts.map((x, i) =>
        <Fragment key={i}>
          <div className={s.tab}/>
          <p>{x.email}</p>
          <p>{dashNumberFormat(x.number)}</p>
        </Fragment>
      )}
    </section>
  );
};

export default AccountList;
