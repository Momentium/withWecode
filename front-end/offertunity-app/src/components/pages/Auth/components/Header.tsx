import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const Header = () => {
  return(
    <Wrap>
      <Logo>
        <Link to="/"> 
          <img src="/images/header/logo.png" alt="로고"/>
        </Link>
      </Logo>
    </Wrap>
  )
};

export default Header;

const Wrap = styled.div`
  width: 100%;
  height:4.375rem;
  border-bottom:1px solid #00000029;
`;

const Logo = styled.div`
  padding:1.3rem 0 0 20rem;
  img{
    width:10.31rem;
  }
`;



