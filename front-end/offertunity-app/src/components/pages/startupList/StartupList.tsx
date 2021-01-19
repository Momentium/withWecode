import React, { useState, useEffect } from "react";
import TwStartup from "./TwStartup";
import Startup from "./Startup";
import PaginationCmp from "../../common/pagination/PaginationCmp";
import axios from "axios";
import styled from "styled-components";

const StartupList = () => {
  const [startupList, setStartupList] = useState<any[]>([]);
  const itemsPerPage = 16;
  const [page, setPage] = useState(1);

  useEffect(() => {
    axios.get("data/startupList.json").then((res) => {
      const _data = res.data.data;
      setStartupList(_data);
    });
  }, []);

  const handleClickPage = (event: any, value: any) => {
    setPage(value);
  };

  const bannerImg = {
    backgroundImage: `url(/images/startupList/banner.png)`,
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  };

  return (
    <StartupCompanyList>
      <TwStartup />
      <Banner style={bannerImg} />
      <Startup data={startupList} itemsPerPage={itemsPerPage} page={page} />
      <PaginationCmp
        onChange={handleClickPage}
        listLength={startupList.length}
        page={page}
        itemsPerPage={itemsPerPage}
      />
    </StartupCompanyList>
  );
};

export default StartupList;

const StartupCompanyList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
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
  padding: 100px;

  span {
    font-size: 1.25rem;
  }

  p {
    margin-top: 2rem;
    font-size: 1.875rem;
  }
`;