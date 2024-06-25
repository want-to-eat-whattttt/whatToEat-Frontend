import styled from '@emotion/styled';
import React from 'react'
import { Link } from 'react-router-dom';
import logoImage from '../img/what-to-eat-logo.png'

const Header = () => {
  return (
    <>
      <HeaderContainer>
        <Link to="/">
        <Logo src={logoImage} alt="Logo" />
        </Link>
      </HeaderContainer>
      <TitleBar>메뉴 선택이 힘들다면? 추천 버튼을 눌러보세요!</TitleBar>
    </>
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

const Logo = styled.img`
  width: 140px;
  height: 60px;
  margin: 0;
`;

const TitleBar = styled.aside`
    width: 100vw;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-top: 2px solid black;
    border-bottom: 2px solid black;
    background-color: rgba(0, 0, 0, .1);
    font-size: 12px;
    font-weight: 500;
`
