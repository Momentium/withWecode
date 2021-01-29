import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import MoveBar from "../../common/detail/MoveBar";
import CompanyCard from "./compontents/PartnerCard";
import CompanyDescription from "./compontents/PartnerDescription";

const PartnerDetails = () => {
  const [partnerData, setPartnerData] = useState();

  useEffect(() => {
    axios.get("/data/partnerData/partnerDetails.json").then((res) => {
      const _data = res.data.data;
      setPartnerData(_data);
    });
  }, []);

  return (
    <DetailBox>
      <MoveBar data={partnerData} />
      {partnerData && (
        <>
          <CompanyCard data={partnerData} />
          <CompanyDescription data={partnerData} />
        </>
      )}
    </DetailBox>
  );
};

export default PartnerDetails;

const DetailBox = styled.main`
  ${({ theme }) => theme.conWidth}
`;
