import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useLoginQuery } from '@services/reactQuery/useLoginQuery';
import { useNavigate } from 'react-router-dom';
import LoadingCircular from '@components/LoadingCircular';
import NotFound from '@pages/NotFound';
import { useUserStore } from '@store/useUserStore';
import { emailValidator, passwordValidator } from '@utils/validator';

export const Login = () => {
  const [loginValue, setLoginValue] = useState({ email: '', password: '' });
  const [errorMessege, setErrorMessege] = useState({ email: '', password: '' });
  const { mutate: loginMutate, isPending, isError, error, isSuccess } = useLoginQuery();
  const setIsLogin = useUserStore((state) => state.actions.setIsLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      setIsLogin(true);
      navigate('/', { replace: true });
    }
  }, [isSuccess, setIsLogin, navigate]);

  const handleValidation = (e: React.FocusEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (name === 'email') {
      setErrorMessege({ ...errorMessege, email: emailValidator(value) });
    }
    if (name === 'password') {
      setErrorMessege({ ...errorMessege, password: passwordValidator(value) });
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (emailValidator(loginValue.email) !== 'success' || passwordValidator(loginValue.password) !== 'success') {
      setErrorMessege({ email: emailValidator(loginValue.email), password: passwordValidator(loginValue.password) });
    } else {
      loginMutate(loginValue);
    }
  };
  if (isPending) {
    return <LoadingCircular />;
  }
  if (isError) return <NotFound messege={error.message} />;

  return (
    <LoginContainer>
      <img src="/assets/logo.png" alt="logo" />
      <h2 className="login__title">Studio 로그인</h2>
      <form onSubmit={handleLogin} className="login__form">
        <div className="login__input">
          <input
            type="email"
            value={loginValue.email}
            name="email"
            onChange={(e) => setLoginValue({ ...loginValue, email: e.target.value })}
            onBlur={handleValidation}
            placeholder="이메일"
            required
          />
          {errorMessege.email !== 'success' && <ErrorMessege>{errorMessege.email}</ErrorMessege>}
        </div>
        <div className="login__input">
          <input
            type="password"
            value={loginValue.password}
            name="password"
            onChange={(e) => setLoginValue({ ...loginValue, password: e.target.value })}
            onBlur={handleValidation}
            placeholder="비밀번호"
            required
          />
          {errorMessege.password !== 'success' && <ErrorMessege>{errorMessege.password}</ErrorMessege>}
        </div>
        <Button
          type="submit"
          disabled={isPending || errorMessege.email !== 'success' || errorMessege.password !== 'success'}
        >
          로그인
        </Button>
      </form>
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
  & .login__title {
    text-align: center;
    margin-bottom: 20px;
  }

  & .login__form {
    display: flex;
    flex-direction: column;
    gap: 15px;
    & .login__input {
      display: flex;
      flex-direction: column;
      position: relative;
      width: 100%;
      & input {
        background-color: ${(props) => props.theme.colors.background[2]};
        border: none;
        border-radius: 4px;
        color: ${(props) => props.theme.colors.text.title};
        padding: 10px;
        margin-bottom: 10px;
        &::placeholder {
          color: ${(props) => props.theme.colors.text.bodySubtle};
        }
      }
    }
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

const ErrorMessege = styled.span`
  position: absolute;
  bottom: -20px;
  color: ${(props) => props.theme.colors.danger.normal};
  font-size: var(--font-size-caption);
  line-height: var(--line-height-caption);
  font-weight: var(--font-weight-caption);
  margin-bottom: 10px;
`;
