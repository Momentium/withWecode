import React, { useState, useEffect } from "react";
import Title from "./Title";
import CardList from "./CardList";
import axios from "axios";
import styled from "styled-components";

const TwStartup = (props: any) => {
  const [like, setLike] = useState<Boolean>(false);
  const [startupList, setStartupList] = useState<any>([]);

  // 백엔드 API 나오면 수정할예정
  useEffect(() => {
    axios.get("http://10.0.1.44:3000/companies/list/startup").then((res) => {
      const _data = res.data.companies;
      setStartupList(_data.slice(0, 3));
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
