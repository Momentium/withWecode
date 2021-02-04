import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import Card from "./Card";

const CardList = ({ list, data, name, boxName, background }: any) => {
  const [isLogin, setIsLogin] = useState<boolean>();

  useEffect(() => {
    sessionStorage.getItem("token") ? setIsLogin(true) : setIsLogin(false);
  }, []);

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
              isLogin={isLogin}
            />
          </Link>
        ))}
      {data && (
        <CardBottom dataLength={data?.length}>
          {data.map((item: any, idx: number) => {
            return (
              <Link to={`/startup/detail/${item.id}`} key={idx}>
                <Card
                  data={item}
                  key={idx}
                  name={name}
                  background={background}
                  isLogin={isLogin}
                />
              </Link>
            );
          })}
        </CardBottom>
      )}
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

const CardBottom = styled.div<{ dataLength: number }>`
  display: grid;

  grid-template-columns: 1fr 1fr 1fr 1fr;

  ${(props) => css`
    grid-template-rows: repeat(1fr, props.dataLength % 4);
  `}
`;
