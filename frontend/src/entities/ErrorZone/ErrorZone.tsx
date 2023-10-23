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

      errorElem.style.opacity = '0';

      setTimeout(() => {
        setError(exactError);
        errorElem.style.opacity = '1';
      }, 250);

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




// if (!positiveError && !!error){
//   console.log('1');
//   errorRef.current!.style.opacity = '0';
//   setTimeout(() => {
//     setError('');
//     changeZoneHeight(0);
//   }, 250);
//   return;
// }
//
// if (!!positiveError && !error){
//   console.log('2');
//   setError(errorMessages[positiveError[0] as keyof typeof errorMessages]);
//   requestAnimationFrame(() => {
//     if (errorRef.current) errorRef.current.style.opacity = '1';
//     changeZoneHeight(17);
//   });
//   return;
// }
//
// if (positiveError[0] !== error){
//   errorRef.current!.style.opacity = '0';
//
//   setTimeout(() => {
//     setError(errorMessages[positiveError[0] as keyof typeof errorMessages]);
//     // changeZoneHeight(0);
//     requestAnimationFrame(() => {
//       errorRef.current!.style.opacity = '1';
//       // changeZoneHeight(17);
//     });
//   }, 250);
// }
