import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import * as St from 'components/styles/styledComp';
import BasicBtn from 'components/common/button/BasicBtn';
import InputPjt from './InputPjt';
import ViewPjt from './ViewPjt';

const PartnerPjt = () => {

  const [curMode, setCurMode] = useState<boolean>(true);
  const handleSubmit = () => {
    setCurMode(!curMode);
  }

  return (
    <>
      <St.SectionTitle>지원사업 관리</St.SectionTitle>
      
      <StADCont>

        <StADWrap>
          <div className="plus">+</div>
          <div className="msg">지원사업 공고 등록</div>
        </StADWrap>

        <Link to={"/project/detail/0"}>
        <StADWrap img={"/images/projectPage/projectImg/progress1.png"}>
          <StHoverCont className="hover-cont"> 
            <div className="title">지원사업 이름이 들어갑니다.</div>
            <div className="contents">이번서울창업허브 허브방송국에서 다양한 형태의 영상 촬영 지원 프로그램을 통해 기업의 제품 영상 촬영, 사진 촬영 지원 콘텐츠 제작 등으로 스타트업 매출 증대 및 기업의 인지도 상승 기여</div>
            <StInfoTable>
              <tbody>
                <tr>
                  <th className="first-th">주최</th>
                  <td>이름이 들어갑니다.</td>
                </tr>
                <tr>
                  <th>지원분야</th>
                  <td>2020.00.00</td>
                </tr>
                <tr>
                  <th>지원대상</th>
                  <td>공간지원</td>
                </tr>
                <tr>
                  <th>마감일</th>
                  <td>7년 미만 기업</td>
                </tr>
              </tbody>
            </StInfoTable>
            <div className="btn-cont">
              <StBtn>수정하기</StBtn>
              <StBtn>삭제하기</StBtn>
              <StBtn>오픈신청</StBtn>
            </div>
          </StHoverCont>
        </StADWrap>
        </Link>
        
        <Link to={"/project/detail/1"}>
          <StADWrap img={"/images/projectPage/projectImg/progress2.png"}>
          <StHoverCont className="hover-cont"> 
            <div className="title">지원사업 이름이 들어갑니다.</div>
            <div className="contents">이번서울창업허브 허브방송국에서 다양한 형태의 영상 촬영 지원 프로그램을 통해 기업의 제품 영상 촬영, 사진 촬영 지원 콘텐츠 제작 등으로 스타트업 매출 증대 및 기업의 인지도 상승 기여</div>
            <StInfoTable>
              <tbody>
                <tr>
                  <th className="first-th">주최</th>
                  <td>이름이 들어갑니다.</td>
                </tr>
                <tr>
                  <th>지원분야</th>
                  <td>2020.00.00</td>
                </tr>
                <tr>
                  <th>지원대상</th>
                  <td>공간지원</td>
                </tr>
                <tr>
                  <th>마감일</th>
                  <td>7년 미만 기업</td>
                </tr>
              </tbody>
            </StInfoTable>
            <div className="btn-cont">
              <StBtn>수정하기</StBtn>
              <StBtn>삭제하기</StBtn>
              <StBtn>오픈신청</StBtn>
            </div>
          </StHoverCont>
          </StADWrap>
        </Link>


      </StADCont>
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

  ${
    props => props.img && 
    css`
      background-image: url(${props.img});
      background-position: center;
      background-repeat: no-repeat;
      background-size: cover;
    `
  }

  border: 1px solid #CDCDCD;

  .plus {
    font-size: 60px;
    color: #B7B7B7;
  }

  .msg {
    margin-top: 24px;
    color: #B7B7B7;
    font-size: 18px;
  }
`;

const StHoverCont = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  background: black;
  width: 600px;
  height: 400px;

  padding: 32px;

  transition: opacity 0.33s ease-in-out;
  opacity: 0;

  &:hover {
    opacity: 0.9;
  }

  color: white;

  .title {
    font-size: 21px;
    font-weight: bold;
  }
  .contents {
    font-size: 15px;
    margin-top: 24px;
    margin-bottom: 16px;
  }
  .btn-cont {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
`;

const StInfoTable = styled.table`
  th, td {
    text-align: left;
    font-size: 18px;
  }
  td {
    width: 8.813em;
  }

  th {
    white-space: nowrap;
    font-weight: bold;

    padding: 8px 32px 8px 0;
  }
  margin-bottom: 40px;
`;

const StBtn = styled.span`
  width: 135px;
  line-height: 34px;

  text-align: center;
  vertical-align: middle;

  font-size: 15px;
  font-weight: bold;

  border: 1px solid #5541EE;
  border-radius: 5px;
  background: white;
  color: #5541ED;

  &:hover {
    border: 1px solid #5541EE;
    border-radius: 5px;
    background: #5541ED;
    color: white;
  }
`;