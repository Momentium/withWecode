import React from "react";
import styled from "styled-components";
import Card from "./Card";

const Interested = () => {
  return (
    <Wrap>
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
      <Card />
    </Wrap>
  );
};

export default Interested;

const Wrap = styled.section`
  ${({ theme }) => theme.conWidth}
`;
