import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import MoveBar from "../../../common/detail/MoveBar";
import CompanyCard from "./components/CompanyCard";
import CompanyDescription from "./components/CompanyDescription";
import IRBtn from "../../../common/detail/buttons/IRButton";
import * as Mt from "api/methods";

const boxStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginTop: "10rem",
  marginBottom: "7.5rem",
};

const StartupDetails = ({ match }: any) => {
  const [companyData, setCompanyData] = useState();
  const [isLogin, setIsLogin] = useState<boolean>();
  const _token = Mt.getUserInfo().token;

  useEffect(() => {
    _token ? setIsLogin(true) : setIsLogin(false);
  }, []);

  useEffect(() => {
    const _resId = match.params.id;
    let config = {};
    if (_token) {
      config = {
        Accept: "application/json",
        Authorization: `${_token}`,
      };
    }
    axios
      .get(`${process.env.REACT_APP_URL}/companies/startup/${_resId}`, {
        headers: config,
      })
      .then((res) => {
        const _data = res.data.company;
        setCompanyData(_data);
      });
  }, []);

  return (
    <DetailBox>
      <MoveBar data={companyData} />
      {companyData && (
        <>
          <CompanyCard
            data={companyData}
            type={"startup"}
            isLogin={isLogin}
            token={_token}
          />
          <CompanyDescription data={companyData} />
        </>
      )}
      <IRBtn boxStyle={boxStyle} type={"startup"} />
    </DetailBox>
  );
};

export default StartupDetails;

const DetailBox = styled.main`
  ${({ theme }) => theme.conWidth}
  margin-top: 100px;
`;
