import React from "react";
import styled from "styled-components";

const StButton = () => {
  return <StButtonWrap>지원하기</StButtonWrap>;
};

export default StButton;

const StButtonWrap = styled.button`
  width: 18.75rem;
  height: 3.5rem;
  background: #5541ed;
  border-radius: 5px;
  color: white;
  font-size: 1.125rem;
  font-weight: bold;
  cursor: pointer;
`;
