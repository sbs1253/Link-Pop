import { useState } from 'react';

export const useToggle = (): [boolean, (value?: boolean) => void] => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = (value?: boolean) => setToggle((prev) => (typeof value === 'boolean' ? value : !prev));
  return [toggle, handleToggle];
};
