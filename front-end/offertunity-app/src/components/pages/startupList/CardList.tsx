import React from "react";
import styled from "styled-components";
import Card from "./Card";

const CardList = ({ list, name, boxName }: any) => {
  return (
    <Container className={boxName}>
      {list.map((data: any, idx: number) => (
        <Card data={data} key={idx} name={name} />
      ))}
    </Container>
  );
};

export default CardList;

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  width: 100%;

  &.issueBox {
    justify-content: space-between;
  }
`;
