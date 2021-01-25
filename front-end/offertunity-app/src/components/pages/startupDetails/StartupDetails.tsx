import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
import MoveBar from "./MoveBar";
import CompanyCard from "./CompanyCard";
import CompanyDescription from "./CompanyDescription";
import IRBtn from "./IRBtn";

const StartupDetails = () => {
  const [companyData, setCompanyData] = useState();
  const [like, setLike] = useState<boolean>();

  const boxStyle = {
    width: "100%",
    display: "flex",
    justifyContent: "center",
    marginTop: "10rem",
    marginBottom: "7.5rem",
  };

  useEffect(() => {
    axios.get("/data/startupDetail.json").then((res) => {
      const data = res.data.data;
      setCompanyData(data);
      setLike(data.like);
    });
  }, []);

  const clickLike = (e: React.MouseEvent<HTMLDivElement>) => {
    setLike(!like);
  };

  return (
    <DetailBox>
      <MoveBar />
      {companyData && (
        <>
          <CompanyCard data={companyData} clickLike={clickLike} />
          <CompanyDescription data={companyData} />
        </>
      )}
      <IRBtn boxStyle={boxStyle} />
    </DetailBox>
  );
};

export default StartupDetails;

const DetailBox = styled.main`
  ${({ theme }) => theme.ConWidth}
`;
