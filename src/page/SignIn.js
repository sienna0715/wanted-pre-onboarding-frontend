import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../commons/Button';
import axios from 'axios';

export default function SignIn({ setIsLogin }) {
  const navigate = useNavigate();
  const [idInfo, setIdInfo] = useState('');
  const [pwdInfo, setPwdInfo] = useState('');
  const [keepLogin, setKeepLogin] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleIdInput = (e) => {
    setIdInfo(e.target.value);
  };
  const handlePwdInput = (e) => {
    setPwdInfo(e.target.value);
  };

  const loginRequest = () => {
    if (!idInfo || !pwdInfo) {
      setErrorMsg('아이디와 비밀번호를 입력해주세요');
      return;
    }

    // console.log({ username: idInfo, password: pwInfo });
    return axios
      .post('https://www.pre-onboarding-selection-task.shop/auth/signin', {
        email: idInfo,
        password: pwdInfo,
      })
      .then((res) => {
        console.log(res.data.access_token);
        localStorage.setItem('access_token', res.data.access_token);
        sessionStorage.setItem('login', true);
        sessionStorage.setItem('id', idInfo);
        setErrorMsg('');
        navigate('/todo');
      })
      .catch((error) => {
        console.log(error);
        setErrorMsg('로그인에 실패했습니다.');
      });
  };

  return (
    <SignWrap>
      <SignContainer>
        <IntroBox>
          <Title>Log In</Title>
          <Content>
            By continuing, you agree to our <BlueText>User Agreement</BlueText>{' '}
            and
            <BlueText> Privacy Policy</BlueText>.
          </Content>
        </IntroBox>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Input
            data-testid="email-input"
            type="email"
            placeholder="email"
            onChange={handleIdInput} //handleInput("username")
          />
          <Input
            data-testid="password-input"
            type="password"
            placeholder="password"
            onChange={handlePwdInput} // handleInput("password")
          />
          {errorMsg ? (
            <ErrorMessage className="error">{errorMsg}</ErrorMessage>
          ) : (
            ''
          )}
          <CheckboxContainer>
            <Checkbox
              type="checkbox"
              onChange={() => setKeepLogin(!keepLogin)}
            />
            <CheckboxText>로그인 상태 유지하기</CheckboxText>
          </CheckboxContainer>
          <Text>
            Forget your <BlueText>password</BlueText>?
          </Text>
          <Button
            data-testid="signin-button"
            type="submit"
            onClick={loginRequest}
          >
            Log in
          </Button>
        </Form>
        <Text>
          New to Service?{' '}
          <Link to="/signup">
            <LinkText>Sign up</LinkText>
          </Link>
        </Text>
      </SignContainer>
    </SignWrap>
  );
}

const SignWrap = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  color: var(--color-white);
`;

const SignContainer = styled.div`
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: 2rem;
  width: 500px;
  height: 600px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 3rem;
`;

const IntroBox = styled.div`
  width: 100%;
  padding: 0 1rem;
`;

const Title = styled.div`
  font-size: 2rem;
  font-weight: bold;
  margin-top: 1rem;
`;

const Content = styled.p`
  font-size: 1.5rem;
`;

const BlueText = styled.span`
  color: #4b89dc;
`;

const Text = styled.span`
  margin: 1rem 0;
  font-size: 1.2rem;
  text-align: center;
`;

const Form = styled.form`
  border-radius: 2rem;
  display: flex;
  flex-direction: column;
  padding: 2rem;
`;

const ErrorMessage = styled.span`
  font-size: 1rem;
  text-align: center;
  margin-top: 0.5rem;
  color: red;
`;

const Input = styled.input`
  padding: 1rem;
  border-radius: 2rem;
  outline: none;
  border: none;
  background-color: #ffead8;
  &:nth-child(1) {
    margin-bottom: 1rem;
  }
`;

const CheckboxContainer = styled.label`
  display: flex;
  align-items: center;
  font-size: 1rem;
  margin-bottom: 1rem;
  margin-top: 1rem;
  padding-left: 1rem;
`;

const Checkbox = styled.input``;
const CheckboxText = styled.label`
  font-size: 1rem;
  margin-left: 0.5rem;
`;

const LinkText = styled.span`
  color: purple;
  text-decoration: underline;
  font-weight: bold;
`;
