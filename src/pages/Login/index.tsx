import React, { useState } from 'react';
import styled from 'styled-components';
import { loginUser, useLogin, copyUserData } from '@hooks/useLogin';

const LoginContainer = styled.div`
  background-color: #121212;
  color: white;
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  margin: 50px auto;
`;

const Title = styled.h2`
  text-align: center;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  background-color: #2a2a2a;
  border: none;
  border-radius: 4px;
  color: white;
  padding: 10px;
  margin-bottom: 10px;
  &::placeholder {
    color: #888;
  }
`;

const Button = styled.button`
  background-color: #1db954;
  color: white;
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  &:disabled {
    background-color: #1a7f3b;
    cursor: not-allowed;
  }
`;

const ErrorMessage = styled.p`
  color: #ff4444;
  text-align: center;
  margin-top: 10px;
`;

export const Login: React.FC = () => {
  const [email, setEmail] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  // const { mutate, isLoading, isError, error, isSuccess, data } = useLogin();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log('loginUser(email, password): ', await loginUser(email, password));
    copyUserData('oldUserId', '6r3fhuMeIEXxpVlbxBTOL8PNKXT2');
    // mutate({ email, password });
  };

  return (
    <LoginContainer>
      <Title>Studio 로그인</Title>
      <Form onSubmit={handleLogin}>
        <Input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일" required />
        <Input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="비밀번호"
          required
        />
        {/* <Button type="submit" disabled={isLoading}>
          {isLoading ? '로그인 중...' : '로그인'}
        </Button> */}
        <Button type="submit">로그인</Button>
      </Form>
      {/* {data.isError && <ErrorMessage>로그인에 실패했습니다. 다시 시도해주세요.</ErrorMessage>} */}
    </LoginContainer>
  );
};
