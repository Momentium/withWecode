import React, { useState, useEffect } from "react";
import TwStartup from "./TwStartup";
import Startup from "./Startup";
import PaginationCmp from "../../../common/pagination/PaginationCmp";
import axios from "axios";
import styled from "styled-components";
import * as Mt from "api/methods";

const StartupList = () => {
  const [startupList, setStartupList] = useState<any[]>([]);
  const [totalLength, setTotalLength] = useState(0);
  const [page, setPage] = useState(1);
  const itemsPerPage = 16;

  const _token = Mt.getUserInfo().token;

  useEffect(() => {
    const LIMIT = 16;
    let config = {};
    if (_token) {
      config = {
        Accept: "application/json",
        Authorization: `${_token}`,
      };
    }
    axios
      .get(
        `${process.env.REACT_APP_URL}/companies/list/startup?offset=${page}&limit=${LIMIT}`,
        {
          headers: config,
        }
      )
      .then((res) => {
        setStartupList(res.data.companies);
      });
  }, [page]);

  useEffect(() => {
    // axios.get(`http://10.0.1.44:3000/companies/list/startup`)
    axios.get(`${process.env.REACT_APP_URL}/companies/list/startup`)
    .then((res) => {
      setTotalLength(res.data.num);
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
      <TwStartup token={_token} />
      <Banner style={bannerImg} />
      <Startup data={startupList} itemsPerPage={itemsPerPage} page={page} />
      <PaginationCmp
        onChange={handleClickPage}
        page={page}
        itemsPerPage={itemsPerPage}
        totalLength={totalLength}
        currPage={"startup"}
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
