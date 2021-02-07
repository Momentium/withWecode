import React from 'react';
import styled from "styled-components";

const FinaAccountMainTxt = () => {
  return(
    <Wrap>
      지원사업부터 투자까지 기회를 찾을 수 있는
    </Wrap>
  )
};

export default FinaAccountMainTxt;

const Wrap = styled.div`
  margin-bottom:4rem;
  padding-bottom:5rem;
  font-size:1.3rem;
  background-image:url("/images/header/logo.png");
  background-repeat:no-repeat;
  background-position-x: left;
  background-position-y: bottom;
`;