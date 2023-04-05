import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { Button } from '../commons/Button';

export default function Home() {
  return (
    <HomeContainer>
      <Title>Welcome!</Title>
      <Content>TODO LIST를 사용하기 위해서는 로그인이 필요합니다:&#41;</Content>
      <Link to='/signup'><Button>회원가입 하러가기</Button></Link>
      <Link to='/signin'><Button margin='1rem 0 0 0'>로그인하러 가기</Button></Link>
    </HomeContainer>
  );
}

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.span`
  font-size: 5rem;
  color: #fff;
`;
const Content = styled.span`
  font-size: 1.5rem;
  color: #fff;
  margin-bottom: 2rem;
`;