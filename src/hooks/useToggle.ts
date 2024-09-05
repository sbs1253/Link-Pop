import { useState } from 'react';

export const useToggle = (): [boolean, () => void] => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = () => setToggle((prev) => !prev);
  return [toggle, handleToggle];
};
