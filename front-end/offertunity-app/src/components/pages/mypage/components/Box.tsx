import React from "react";
import styled from "styled-components";

const Box = () => {
  return (
    <Wrap>
      <Text>
        <p>마이 스타트업 완성률</p>
        <span>50%</span>
      </Text>
      <Button>마이 스타트업 정보 관리</Button>
    </Wrap>
  );
};

export default Box;

const Wrap = styled.div`
  display: inline-block;
  width: 24.5rem;
  height: 16.5rem;
  background: #fff;
  box-shadow: 0px 6px 16px #53526217;
  text-align: center;
  border-radius: 0.5rem;
`;

const Text = styled.div`
  display: inline-block;
  padding-top: 3rem;
  text-align: left;
  p {
    font-size: 1.3rem;
  }
  span {
    display: inline-block;
    margin: 1.5rem 0 2rem 0;
    font-size: 2.875rem;
    font-weight: bold;
  }
`;

const Button = styled.button`
  cursor: pointer;
  width: 15.38rem;
  height: 3rem;
  border: 1px solid #3b24eb;
  border-radius: 2rem;
  font-size: 0.9rem;
  color: #3b24eb;
`;
