import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import MoveBar from "../../common/detail/MoveBar";
import CompanyCard from "./compontents/PartnerCard";
import CompanyDescription from "./compontents/PartnerDescription";
import IRBtn from "../../common/detail/buttons/IRButton";

const boxStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginTop: "10rem",
  marginBottom: "7.5rem",
};

const PartnerDetails = () => {
  const [partnerData, setPartnerData] = useState();

  useEffect(() => {
    axios.get("/data/partnerData/partnerDetails.json").then((res) => {
      const _data = res.data.company;
      setPartnerData(_data);
    });
  }, []);

  return (
    <DetailBox>
      <MoveBar data={partnerData} />
      {partnerData && (
        <>
          <CompanyCard data={partnerData} type={"partner"} />
          <CompanyDescription data={partnerData} />
        </>
      )}
      <IRBtn boxStyle={boxStyle} type={"partner"} />
    </DetailBox>
  );
};

export default PartnerDetails;

const DetailBox = styled.main`
  ${({ theme }) => theme.conWidth}
`;
