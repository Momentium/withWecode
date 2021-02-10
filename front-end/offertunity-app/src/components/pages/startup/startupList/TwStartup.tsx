import React, { useState, useEffect } from "react";
import Title from "./Title";
import CardList from "./CardList";
import axios from "axios";
import styled from "styled-components";

const TwStartup = ({ token }: any) => {
  const [startupList, setStartupList] = useState<any>([]);

  useEffect(() => {
    let config = {};
    if (token) {
      config = {
        Accept: "application/json",
        Authorization: `${token}`,
      };
    }
    axios
      .get(`${process.env.REACT_APP_URL}/companies/list/startup`, {
        headers: config,
      })
      .then((res) => {
        const _data = res.data.companies;
        setStartupList(_data.slice(0, 3));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <ConBox>
      <Title title={"금주의 대표 스타트업"} />
      <CardList
        list={startupList}
        name={"issueStartup"}
        boxName={"issueBox"}
        background={"cover"}
      />
    </ConBox>
  );
};

export default TwStartup;

const ConBox = styled.div`
  width: 80rem;
`;
