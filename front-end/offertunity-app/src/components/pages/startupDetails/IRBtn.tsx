import React from "react";
import styled from "styled-components";

const Buttons = ({ boxStyle }: any) => {
  const handleClickBtn = () => {
    console.log("hello");
  };

  return (
    <BtnBox style={boxStyle}>
      <Btn onClick={handleClickBtn}>IR 자료 요청하기</Btn>
    </BtnBox>
  );
};

export default Buttons;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
`;

const Btn = styled.button`
  width: 18.75rem;
  height: 3.5rem;
  border-radius: 5px;
  background-color: #5541ed;
  color: white;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.base};
  cursor: pointer;
`;
