import React from "react";
//import axios from "axios";

import styled from "styled-components";

const Naver = () => {
  // useEffect(() => {
  //   handleNAVER();
  // }, []);

  const handleNAVER = () => {
    // axios.get("http://10.0.1.29:3000/auths/naver");
    window.location.href = `${process.env.REACT_APP_URL}/auths/naver`;
  };

  return <NaverBtn onClick={handleNAVER}>네이버</NaverBtn>;
};

export default Naver;

const NaverBtn = styled.button`
  background-image: url("/images/signup/naverLogo.png");
  width: 3.12rem;
  height: 3.12rem;
  background-size: contain;
  font-size: 0;
  border-radius: 100%;
  cursor: pointer;
`;
