import React, { useState, useEffect } from "react";
import Title from "./Title";
import CardList from "./CardList";
import axios from "axios";
import styled from "styled-components";

const TwStartup = (props: any) => {
  const [like, setLike] = useState<Boolean>(false);
  const [startupList, setStartupList] = useState<any>([]);

  useEffect(() => {
    axios.get("data/thisweekStartup.json").then((res) => {
      const _data = res.data.data;
      setStartupList(_data);
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
