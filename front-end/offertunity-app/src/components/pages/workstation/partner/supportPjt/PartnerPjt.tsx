import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from "react-router-dom";
import styled, { css } from "styled-components";
import * as St from "components/styles/styledComp";
import InputPjt from "./AddPjt";
import PjtList from './PjtList';

const PartnerPjt = () => {
  const _params = useParams<any>();
  // const _userInfo = 
  const [pjtList, setPjtList] = useState<any[]>([]);

  useEffect(() => {
    axios.get(`${process.env.REACT_APP_URL}/companies/partner/`)
    .then((res) => {
      const _resData = res.data;
      console.log(_resData)
      _resData.map((el:any, idx:number) => 
        <Link to={`/project/${el.id}`} key={idx}>
          <StADWrap>
            <PjtList

            />
          </StADWrap>
        </Link>
      )
    })
  }, [])

  return (
    <>
      {_params.addon ? (
        <>
          <InputPjt />
        </>
      ) : (
        <>
          <St.SectionTitle>지원사업 관리</St.SectionTitle>
          <StADCont>
            <Link to={"/workstation/myproject/addPjt"}>
              <StADWrap>
                <div className="plus">+</div>
                <div className="msg">지원사업 공고 등록</div>
              </StADWrap>
            </Link>
            
            {pjtList}

          </StADCont>
        </>
      )}
    </>
  );
};
export default PartnerPjt;

const StADCont = styled.div`
  display: flex;
  flex-wrap: wrap;

  justify-content: space-between;

  background: white;
`;

const StADWrap = styled.div<any>`
  position: relative;

  cursor: pointer;
  user-select: none;

  margin: 24px 0;

  width: 600px;
  height: 400px;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  ${(props) =>
    props.img &&
    css`
      background-image: url(${props.img});
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    `}

  border: 1px solid #CDCDCD;

  .plus {
    font-size: 60px;
    color: #b7b7b7;
  }

  .msg {
    margin-top: 24px;
    color: #b7b7b7;
    font-size: 18px;
  }
`;

