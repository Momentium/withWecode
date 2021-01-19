import React from "react";
import styled from "styled-components";
import Card from "./Card";

const CardList = ({ list, data, name, boxName, itemsPerPage, page }: any) => {
  console.log(name, boxName);
  return (
    <Container className={boxName}>
      {list &&
        list.map((data: any, idx: number) => (
          <Card data={data} key={idx} name={name} />
        ))}
      {data &&
        data
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((item: any) => {
            return <Card data={item} name={name} />;
          })}
    </Container>
  );
};

export default CardList;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;

  &.issueBox {
    justify-content: flex-start;
    align-items: center;
  }

  &.startupBox {
    flex-wrap: wrap;
  }
`;
