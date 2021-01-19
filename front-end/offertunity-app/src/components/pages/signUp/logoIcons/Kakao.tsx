import React from 'react';
import styled from "styled-components";

const Kakao = () => {
  return(
    <KakaoBtn>카카오</KakaoBtn>
  )
};

export default Kakao;

const KakaoBtn = styled.button`
  width:6.8rem;
  height:6.8rem;
  background-size: contain;
  font-size:0;
  border-radius:100%;
  background-image:url("/images/signup/kakaoLogo.png");
  cursor: pointer;
  margin:0 4.5rem;
`;