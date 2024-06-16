import styled from '@emotion/styled';
import React from 'react'
import { Link } from 'react-router-dom';

const Header = () => {
  return (
    <HeaderContainer>
      <Link to="/">
        <Logo />
      </Link>
    </HeaderContainer>
  )
}

export default Header

const HeaderContainer = styled.header`
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 20px;
  background-color: #ece8e2;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.h1`
  width: 180px;
  height: 72px;
  font-size: 24px;
  color: white;
  background-image: url();
  margin: 0;
`;

const Nav = styled.nav`
  display: flex;
  align-items: center;
  font-size: 30px;

  @media (max-width: 500px) {
    font-size: 20px;
  }

  @media (max-width: 1024px) {
    font-size: 20px;
  }
`;