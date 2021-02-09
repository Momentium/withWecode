import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import MoveBar from "../../../common/detail/MoveBar";
import CompanyCard from "./compontents/PartnerCard";
import CompanyDescription from "./compontents/PartnerDescription";
import IRBtn from "../../../common/detail/buttons/IRButton";
import Buttons from "../../../common/detail/buttons/Buttons";
import * as Mt from "api/methods";

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
      .get(`http://10.0.1.44:3000/companies/partner/${_resId}`, {
        headers: config,
      })
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
          <CompanyCard
            data={partnerData}
            type={"partner"}
            isLogin={isLogin}
            token={_token}
          />
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
  margin-top: 100px;
`;
