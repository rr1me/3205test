import s from './ErrorZone.module.scss';
import { useAppSelector } from '../../redux/store';
import { ErrorType } from '../../redux/formSlice';
import { useLayoutEffect, useRef, useState } from 'react';
import { useIsFirstRender } from '../../shared/utils';

const ErrorZone = () => {
  const errors = useAppSelector(s=>s.formSlice.errors);

  const [error, setError] = useState<string>('');

  const errorRef = useRef<HTMLParagraphElement>(null);

  const isFirstRender = useIsFirstRender();
  useLayoutEffect(() => {
    const errorElem = errorRef.current;
    if (isFirstRender || !errorElem) return;
    const entries = Object.entries(errors);
    const possibleError = entries.filter(x=>x[1])[0];

    const positiveError = possibleError ? possibleError[0] : undefined;

    if (positiveError){
      const exactError = errorMessages[positiveError as keyof typeof errorMessages];

      const callback = () => {
        setError(exactError);
        errorElem.style.opacity = '1';
      };

      if (!error){
        callback();
        return;
      }

      errorElem.style.opacity = '0';

      setTimeout(callback, 250);

      return;
    }

    errorElem.style.opacity = '0';
  }, [errors]);

  return (
    <article>
      <p className={s.error} ref={errorRef}>{error ? '• ' + error : ''}</p>
    </article>
  );
};

export default ErrorZone;

const errorMessages: Record<ErrorType, string> = {
  invalidEmail: 'Please provide valid email address',
  internalError: 'Internal error. Please try again later'
};
