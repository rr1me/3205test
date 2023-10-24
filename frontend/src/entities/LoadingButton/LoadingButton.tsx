import s from './LoadingButton.module.scss';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import { combinedStyle } from '../../shared/utils';

const LoadingButton = ({ loading = false, children, ...props }:
  {loading?: boolean, children: ReactNode} & ButtonHTMLAttributes<HTMLButtonElement>) => {



  return (
    <button className={s.button + combinedStyle(loading, s.loading)} {...props}>

      <span className={s.loader} style={{ opacity: loading ? 1 : 0 }}>
        <svg viewBox="22 22 44 44">
          <circle className={s.circle} cx="44"
            cy="44" r="20.2" fill="none" strokeWidth="3.6">
          </circle>
        </svg>
      </span>

      <span style={{ opacity: loading ? 0 : 1 }}>
        {children}
      </span>
    </button>
  );
};

export default LoadingButton;
