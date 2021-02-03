import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Card from "./Card";

const CardList = ({ list, data, name, boxName, background }: any) => {
  return (
    <Container className={boxName}>
      {list &&
        list.map((data: any, idx: number) => (
          <Link to={`/startup/detail/${data.id}`} key={idx}>
            <Card
              data={data}
              key={idx}
              name={name}
              background={background}
              service={true}
            />
          </Link>
        ))}
      <CardBottom>
        {data &&
          data.map((item: any, idx: number) => {
            return (
              <Link to={`/startup/detail/${item.id}`} key={idx}>
                <Card
                  data={item}
                  key={idx}
                  name={name}
                  background={background}
                />
              </Link>
            );
          })}{" "}
      </CardBottom>
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

const CardBottom = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr;
`;
