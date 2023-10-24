import s from './LoadingButton.module.scss';
import React, { ButtonHTMLAttributes, useLayoutEffect, useRef } from 'react';
import { combinedStyle, useIsFirstRender } from '../../shared/utils';
import { useAppSelector } from '../../redux/store';

const LoadingButton = (props: ButtonHTMLAttributes<HTMLButtonElement>) => {
  const loading = useAppSelector(s=>s.formSlice.loading);
  const buttonRef = useRef<HTMLButtonElement>(null);

  const isFirstRender = useIsFirstRender();
  useLayoutEffect(() => {
    const element = buttonRef.current;
    if (!element) return;

    if (isFirstRender) {
      element.style.width = element.getBoundingClientRect().width + 'px';
      return;
    }

    const currentWidth = Number(element.style.width.replace('px', ''));

    if (loading){
      element.style.width = currentWidth + 26 + 16.59 + 'px';
      return;
    }

    element.style.width = currentWidth - 26 - 16.59 + 'px'; // 16.59 is difference between submit and resubmit, 26 is width + 'marginRight' of loader
  }, [loading]);

  return (
    <button className={s.button + combinedStyle(loading, s.loading)} {...props} ref={buttonRef}>

      <span className={s.loader} style={{ opacity: loading ? 1 : 0 }}>
        <svg viewBox="22 22 44 44">
          <circle className={s.circle} cx="44"
            cy="44" r="20.2" fill="none" strokeWidth="3.6">
          </circle>
        </svg>
      </span>

      <span className={s.label}>
        {loading ? 'Resubmit' : 'Submit'}
      </span>
    </button>
  );
};

export default LoadingButton;
