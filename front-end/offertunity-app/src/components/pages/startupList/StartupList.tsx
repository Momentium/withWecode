import React, { useState, useEffect } from "react";
import TwStartup from "./TwStartup";
import Startup from "./Startup";
import axios from "axios";
import styled from "styled-components";
import Pagination from "@material-ui/lab/Pagination";

const StartupList = () => {
  const [startupList, setStartupList] = useState<any[]>([]);
  const itemsPerPage = 10;
  const [noOfPages] = React.useState(
    Math.ceil(startupList.length / itemsPerPage)
  );
  const [page, setPage] = React.useState(1);

  const handleChnage = () => {
    console.log("clicked");
  };

  useEffect(() => {
    axios.get("data/startupList.json").then((res) => {
      const _data = res.data.data;
      setStartupList(_data);
    });
  }, []);

  return (
    <StartupCompanyList>
      <TwStartup />
      <Banner>
        <span>OFFER + (OPPOR)TUNITY</span>
        <p>스타트업의 기회를 만들어 갑니다.</p>
      </Banner>
      <Startup data={startupList} />
      <Pagination
        count={noOfPages}
        page={page}
        onChange={handleChnage}
        defaultPage={1}
        colo="primary"
        size="large"
        showFirstButton
        showLastButton
      />
    </StartupCompanyList>
  );
};

export default StartupList;

const StartupCompanyList = styled.div`
  height: 182rem;
`;

const Banner = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  width: 100%;
  height: 12.875rem;
  border: 1px solid black;
  margin-top: 6.875rem;
  margin-bottom: 5.25rem;

  span {
    font-size: 1.25rem;
  }

  p {
    margin-top: 2rem;
    font-size: 1.875rem;
  }
`;
