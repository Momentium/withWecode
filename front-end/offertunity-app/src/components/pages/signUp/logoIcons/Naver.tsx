import React from 'react';
import styled from "styled-components";

const Naver = () => {
  return(
    <NaverBtn>네이버</NaverBtn>
  )
};

export default Naver;

const NaverBtn =styled.button`
  background-image:url("/images/signup/naverLogo.png");
  width:6.8rem;
  height:6.8rem;
  background-size: contain;
  font-size:0;
  border-radius:100%;
  cursor: pointer;
`;