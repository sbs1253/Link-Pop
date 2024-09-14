import { useState } from 'react';
// useToggle = (): [boolean, (value?: boolean) => void] 내부 배열의 변경 가능
// 아래방식 사용시 변경 불가능 클로저방식
export const useToggle = () => {
  const [toggle, setToggle] = useState(false);
  const handleToggle = (value?: boolean) => setToggle((prev) => (typeof value === 'boolean' ? value : !prev));
  return [toggle, handleToggle] as const;
};
