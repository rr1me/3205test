import { useRef } from 'react';

export const useIsFirstRender = () => {
  const ref = useRef(true);
  const isFirstRender = ref.current;
  ref.current = false;
  return isFirstRender;
};

export const combinedStyle = (condition: boolean, style: string) => condition ? ' ' + style : '';

export const delay = (t: number) => new Promise(x => setTimeout(x, t));
