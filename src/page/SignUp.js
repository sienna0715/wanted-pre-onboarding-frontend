import React, { useState } from 'react';
import styled from 'styled-components';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '../commons/Button';
import axios from 'axios';

export default function Signup() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [userPwd, setUserPwd] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleIdInput = (e) => {
    setUserId(e.target.value);
  };
  const handlePwdInput = (e) => {
    setUserPwd(e.target.value);
  };

  const signupRequest = () => {
    if (!userId.includes('@') && !isPwdValid) {
      setErrorMsg('아이디, 비밀번호를 입력해주세요');
      return;
    } else if (userId.includes('@') && !isPwdValid) {
      setErrorMsg('8자 이상으로 작성해주세요');
      return;
    }
    return axios
      .post('https://www.pre-onboarding-selection-task.shop/auth/signup', {
        email: userId,
        password: userPwd,
      })
      .then((res) => {
        navigate('/signin');
      })
      .catch((err) => {
        // console.log(err)
        setErrorMsg('이미 존재하는 아이디입니다.');
      });
  };

  const isPwdValid = userPwd.trim().length >= 8;
  // console.log(isPwdValid);

  return (
    <SignWrap>
      <SignContainer>
        <IntroBox>
          <Title>Sign Up</Title>
          <Content>
            By continuing, you are setting up this service account and agree to
            our <BlueText>User Agreement</BlueText> and{' '}
            <BlueText>Privacy Policy</BlueText>.
          </Content>
        </IntroBox>
        <Form onSubmit={(e) => e.preventDefault()}>
          <Input
            data-testid="email-input"
            type="email"
            placeholder="email"
            onChange={handleIdInput}
          />
          <Input
            data-testid="password-input"
            type="password"
            placeholder="password"
            onChange={handlePwdInput}
          />
          {errorMsg ? <ErrorMessage>{errorMsg}</ErrorMessage> : ''}
          <Button data-testid="signup-button" margin="2rem 0 0 0" onClick={signupRequest}>
            Sign up
          </Button>
        </Form>
        <Text>
          Already a member?{' '}
          <Link to="/signin">
            <LinkText>Log In</LinkText>
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

const LinkText = styled.span`
  color: purple;
  text-decoration: underline;
  font-weight: bold;
`;
