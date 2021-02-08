import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import MoveBar from "../../../common/detail/MoveBar";
import CompanyCard from "./components/CompanyCard";
import CompanyDescription from "./components/CompanyDescription";
import IRBtn from "../../../common/detail/buttons/IRButton";

const boxStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginTop: "10rem",
  marginBottom: "7.5rem",
};

const StartupDetails = () => {
  const [companyData, setCompanyData] = useState();

  useEffect(() => {
    axios.get("/data/startupDetail.json").then((res) => {
      const data = res.data.data;
      setCompanyData(data);
    });
  }, []);

  return (
    <DetailBox>
      <MoveBar data={companyData} />
      {companyData && (
        <>
          <CompanyCard data={companyData} type={"startup"} />
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
