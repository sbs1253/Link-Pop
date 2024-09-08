import React, { useState } from 'react';
import styled from 'styled-components';
import { useLoginQuery } from '@services/reactQuery/useLoginQuery';
import { useNavigate } from 'react-router-dom';
import LoadingCircular from '@components/LoadingCircular';
import NotFound from '@pages/NotFound';

export const Login: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { mutate, isPending, isError, error, isSuccess } = useLoginQuery();
  const navigate = useNavigate();
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    mutate({ email, password });
  };
  if (isPending) {
    return <LoadingCircular />;
  }
  if (isError) return <NotFound messege={error.message} />;

  if (isSuccess) {
    navigate('/', { replace: true });
  }
  return (
    <LoginContainer>
      <img src="/assets/logo.png" alt="logo" />
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
        <Button type="submit" disabled={isPending}>
          로그인
        </Button>
      </Form>
    </LoginContainer>
  );
};

const LoginContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.colors.background[4]};
  color: ${(props) => props.theme.colors.text.title};
  padding: 20px;
  border-radius: 8px;
  width: 300px;
  & img {
    position: absolute;
    top: -100px;
    left: 50%;
    transform: translateX(-50%);
    width: 70px;
    height: 70px;
  }
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
  background-color: ${(props) => props.theme.colors.background[2]};
  border: none;
  border-radius: 4px;
  color: ${(props) => props.theme.colors.text.title};
  padding: 10px;
  margin-bottom: 10px;
  &::placeholder {
    color: ${(props) => props.theme.colors.text.bodySubtle};
  }
`;

const Button = styled.button`
  background-color: ${(props) => props.theme.colors.success.normal};
  color: ${(props) => props.theme.colors.text.title};
  border: none;
  border-radius: 4px;
  padding: 10px;
  cursor: pointer;
  &:disabled {
    background-color: ${(props) => props.theme.colors.success.disabled};
    cursor: not-allowed;
  }
`;
