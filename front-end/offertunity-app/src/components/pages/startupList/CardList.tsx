import React from "react";
import styled from "styled-components";
import Card from "./Card";

const CardList = ({
  list,
  data,
  name,
  boxName,
  itemsPerPage,
  page,
  background,
}: any) => {
  return (
    <Container className={boxName}>
      {list &&
        list.map((data: any, idx: number) => (
          <Card data={data} key={idx} name={name} background={background} />
        ))}
      {data &&
        data
          .slice((page - 1) * itemsPerPage, page * itemsPerPage)
          .map((item: any) => {
            return <Card data={item} name={name} background={background} />;
          })}
    </Container>
  );
};

export default CardList;

const Container = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 3.5rem;

  &.issueBox {
    justify-content: flex-start;
    align-items: center;
  }

  &.startupBox {
    flex-wrap: wrap;
  }
`;
