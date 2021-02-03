import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import MoveBar from "../../common/detail/MoveBar";
import CompanyCard from "./components/CompanyCard";
import CompanyDescription from "./components/CompanyDescription";
import IRBtn from "../../common/detail/buttons/IRButton";

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

  useEffect(() => {
    sessionStorage.getItem("token") ? setIsLogin(true) : setIsLogin(false);
  }, []);

  useEffect(() => {
    const _resId = match.params.id;
    axios
      .get(`${process.env.REACT_APP_URL}/companies/startup/${_resId}`)
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
          <CompanyCard data={companyData} type={"startup"} isLogin={isLogin} />
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
`;
