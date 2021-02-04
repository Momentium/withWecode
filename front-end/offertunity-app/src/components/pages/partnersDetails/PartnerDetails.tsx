import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import MoveBar from "../../common/detail/MoveBar";
import CompanyCard from "./compontents/PartnerCard";
import CompanyDescription from "./compontents/PartnerDescription";
import IRBtn from "../../common/detail/buttons/IRButton";
import Buttons from "../../common/detail/buttons/Buttons";

const boxStyle = {
  width: "100%",
  display: "flex",
  justifyContent: "center",
  marginTop: "10rem",
  marginBottom: "7.5rem",
};

const PartnerDetails = ({ match }: any) => {
  const [partnerData, setPartnerData] = useState();
  const [isLogin, setIsLogin] = useState<boolean>();

  useEffect(() => {
    sessionStorage.getItem("token") ? setIsLogin(true) : setIsLogin(false);
  }, []);

  useEffect(() => {
    const _resId = match.params.id;
    axios
      .get(`${process.env.REACT_APP_URL}/companies/partner/${_resId}`)
      .then((res) => {
        const _data = res.data.company;
        setPartnerData(_data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <DetailBox>
      <MoveBar data={partnerData} />
      {partnerData && (
        <>
          <CompanyCard data={partnerData} type={"partner"} isLogin={isLogin} />
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
  margin-top: 40px;
`;
