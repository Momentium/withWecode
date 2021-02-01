import React, { useState, useEffect, useRef, useContext } from "react";
import styled, { css, ThemeContext } from "styled-components";
import * as St from "components/styles/styledComp";

const ProjectDetail: React.FC<any> = ({ data }) => {
  const tabContRef = useRef<HTMLDivElement>(null);

  return (
    <StDetailCont>
      {/* {
        onFix && 
        <div style={{ width: '100%', height: `${tabContRef.current?.getBoundingClientRect().height}px` }}/>
      }
      <StTabCont ref={tabContRef} onFix={onFix}>
        <StTabWrap
          className="guide"
          isChecked={curScroll === "guide"}
          onClick={clickTab}
        >
          지원사업 안내
        </StTabWrap>
        <StTabWrap
          className="content"
          isChecked={curScroll === "content"}
          onClick={clickTab}
        >
          지원 내용
        </StTabWrap>
        <StTabWrap
          className="method"
          isChecked={curScroll === "method"}
          onClick={clickTab}
        >
          신청방법 및 대상
        </StTabWrap>
        <StTabWrap
          className="eligibility"
          isChecked={curScroll === "eligibility"}
          onClick={clickTab}
        >
          평가방법
        </StTabWrap>
        <StTabWrap
          className="document"
          isChecked={curScroll === "document"}
          onClick={clickTab}
        >
          제출서류
        </StTabWrap>
        <StTabWrap
          className="caution"
          isChecked={curScroll === "caution"}
          onClick={clickTab}
        >
          유의사항
        </StTabWrap>
      </StTabCont> */}

      <StContentCont>
        <St.SectionTitle>지원사업 안내</St.SectionTitle>
        <St.SectionTitle>지원내용</St.SectionTitle>
        <St.SectionTitle>신청방법 및 대상</St.SectionTitle>
        <St.SectionTitle>평가방법</St.SectionTitle>
        <St.SectionTitle>제출서류</St.SectionTitle>
        <St.SectionTitle>유의사항</St.SectionTitle>
        <St.SectionTitle>문의처</St.SectionTitle>
      </StContentCont>
    </StDetailCont>
  );
};
export default ProjectDetail;

const StDetailCont = styled.div`
  /* margin-top: 84px; */
  background-color: white;
`;

const StTabCont = styled(St.Section)<{ onFix: boolean }>`
  display: flex;
  justify-content: space-around;
  padding-top: 36px;
  padding-bottom: 24px;
  
  background: white;

  ${(props) =>
    props.onFix &&
    css`
      position: fixed;
      top: ${`${props.theme.headMargin}px`};
    `}
`;

const StTabWrap = styled.span<{ isChecked: boolean }>`
  cursor: pointer;
  display: inline-block;
  width: 184px;
  text-align: center;
  padding-bottom: 12px;

  font-weight: bold;
  font-size: 18px;
  letter-spacing: 0px;
  ${(props) =>
    props.isChecked
      ? css`
          color: #5541ed;
          border-bottom: solid 3px #5142e4;
        `
      : css`
          color: #898989;
          border-bottom: solid 3px rgba(0, 0, 0, 0);
        `}
  transition: all 0.1s ease;
`;

const StContentCont = styled.div`
  /* background: gray; */
  margin-top: 96px;
`;
