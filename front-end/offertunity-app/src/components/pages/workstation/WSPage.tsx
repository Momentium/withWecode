import React, { useState, useEffect } from "react";
import styled, { css } from "styled-components";
import * as St from "components/styles/styledComp";
import GuideBar from './GuideBar';
import MyStartup from './startup/myStartup/MyStartup';
import SupportPjt from './startup/supportPjt/SupportPjt';
import AdminIRReq from './common/AdminIRReq';

const WSPage = () => {
  const [curTab, setCurTab] = useState<string>("마이 스타트업")

  const clickTab = (e:any) => {
    const _curTarget = e.currentTarget.textContent;
    setCurTab(_curTarget);
  }

  return (
    <StWSCont>
      <StRootWrap>{`홈  >  지원사업  >  ${curTab}`}</StRootWrap>
      <StTabCont>
        <St.SectionTitle style={{margin: 0}}>워크 스테이션</St.SectionTitle>
        <StTabWrap 
        className="startup"
        isChecked={curTab === "마이 스타트업"}
        onClick={clickTab}>마이 스타트업</StTabWrap>
        <StTabWrap 
        className="project"
        isChecked={curTab === "지원사업 프로젝트"}
        onClick={clickTab}>지원사업 프로젝트</StTabWrap>
        <StTabWrap 
        className="request"
        isChecked={curTab === "IR 자료 요청 관리"}
        onClick={clickTab}>IR 자료 요청 관리</StTabWrap>
        <StTabWrap 
        className="document"
        isChecked={curTab === "IR 자료 및 지원서류 관리"}
        onClick={clickTab}>IR 자료 및 지원서류 관리</StTabWrap>
      </StTabCont>

      <GuideBar curTab={curTab}/>

      {curTab === '마이 스타트업' && <MyStartup/>}
      {curTab === '지원사업 프로젝트' && <SupportPjt/>}
      {curTab === 'IR 자료 요청 관리' && <AdminIRReq/>}
      {curTab === 'IR 자료 및 지원서류 관리' && <></>}

    </StWSCont>
  );
};
export default WSPage;

const StWSCont = styled(St.Section)`
  display: flex;
  flex-direction: column;
  margin-bottom: 50px;
`;

const StRootWrap = styled.div`
  margin-top: 40px;
  margin-bottom: 64px;
`;

const StTabCont = styled.div`
  display: flex;
  justify-content: space-between;

  width: 100%;
  height: 120px;

  padding: 0 72px;
  align-items: center;

  * {
    /* -ms-user-select: none; 
    -moz-user-select: -moz-none;
    -khtml-user-select: none;
    -webkit-user-select: none; */
    user-select: none;
  }
`;

const StTabWrap = styled.span<{ isChecked: boolean }>`
  cursor: pointer;
  display: inline-block;
  /* width: 184px; */
  text-align: center;

  /* padding-bottom: 12px; */

  font-weight: bold;
  font-size: 15px;
  letter-spacing: 0px;
  ${(props) =>
    props.isChecked
      ? css`
          color: #5541ed;
        `
      : css`
          color: #000000;
        `}
  transition: all 0.1s ease;
`;
