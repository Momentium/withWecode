import React from 'react';
import styled from "styled-components";

const Facebook = () => {
  return (
    <FacebookBtn>페이스북</FacebookBtn>
  )
};

export default Facebook;

const FacebookBtn =styled.button`
  background-image:url("/images/signup/facebookLogo.png");
  width:6.8rem;
  height:6.8rem;
  background-size: contain;
  font-size:0;
  border-radius:100%;
  cursor: pointer;
`;