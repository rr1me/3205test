import { useRef } from 'react';

export const useIsFirstRender = () => {
  const ref = useRef(true);
  const isFirstRender = ref.current;
  ref.current = false;
  return isFirstRender;
};

export const combinedStyle = (condition: boolean, style: string) => condition ? ' ' + style : '';

export const isNullOrEmpty = (s: string) => !s || !!s.match(/^ *$/);

export const getDigits = (s: string) => s.replace(/\D/g, '');

export const dashNumberFormat = (s: string) => {
  const digits = getDigits(s);
  let formatted = digits.slice(0, 2);

  for (let i = 2; i < digits.length; i++){
    if (i % 2 === 0) {
      formatted += '-' + digits[i];
      continue;
    }
    formatted += digits[i];
  }

  return formatted;
}
