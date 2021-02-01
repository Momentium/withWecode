import React from "react";
import styled from "styled-components";

const StButton = () => {
  return <StButtonWrap>지원하기</StButtonWrap>;
};

export default StButton;

const StButtonWrap = styled.button`
  width: 300px;
  height: 56px;
  background: #5541ed;
  border-radius: 5px;
  color: white;
  font-size: 18px;
  font-weight: bold;
  cursor: pointer;
`;
