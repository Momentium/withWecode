import React from "react";
import styled from "styled-components";

const Kakao = () => {
  const handleKAKAO = () => {
    window.location.href = "http://10.0.1.29:3000/users/kakao";
  };

  return <KakaoBtn onClick={handleKAKAO}>카카오</KakaoBtn>;
};

export default Kakao;

const KakaoBtn = styled.button`
  width: 3.12rem;
  height: 3.12rem;
  background-size: contain;
  font-size: 0;
  border-radius: 100%;
  background-image: url("/images/signup/kakaoLogo.png");
  cursor: pointer;
  margin: 0 3rem;
`;
