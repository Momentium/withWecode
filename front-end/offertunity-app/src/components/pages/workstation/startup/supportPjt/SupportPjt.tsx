import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled, { css } from 'styled-components';
import * as St from 'styles/styledComp';
import BasicBtn from 'components/common/button/BasicBtn';
import InputPjt from './InputPjt';
import ViewPjt from './ViewPjt';

const SupportPjt = () => {

  const [curMode, setCurMode] = useState<boolean>(true);
  const handleSubmit = () => {
    setCurMode(!curMode);
  }

  return (
    <StCont curMode={curMode}>
      <St.SectionTitle>지원사업 제출 정보</St.SectionTitle>
      {
        curMode ? 
        <>
          <ViewPjt handleSubmit={handleSubmit}/>
          <div className="line"/>
          <StBotCont>
            <div>
              <div>마이페이지는 프로필 관리와 간략한 프로젝트 현황 정보를 포함하고 있습니다.</div>
              <div>스타트업 정보, 지원사업, 투자 관리 등은 [워크스테이션]을 이용해 주세요!</div>
            </div>
            <div>
              <Link to={`/workstation`}>
                <BasicBtn
                  width={335}
                  height={56}
                  fSize={18}
                  fWeight={'bold'}
                  txt={"워크스테이션 바로가기"}
                  onClick={()=>{}}
                />
              </Link>
            </div>
          </StBotCont>
        </>
        :
        <InputPjt handleSubmit={handleSubmit}/>
      }
    </StCont>
  );
};
export default SupportPjt;

const StCont = styled.div<{curMode:boolean}>`
  padding: 0 56px;

  .line {
    margin: 120px 0;
    height: 1px;
    background: black;
    width: 100%;
  }

  .label {
    font-size: 18px;
    ${
      props => props.curMode ?
      css`
        color: black;
      `
      :
      css`
        color: #898989;
        font-weight: bold;
      `
    }
  }
`;

const StBotCont = styled.div`
  width: 100%;
  height: 100px;

  padding: 0 72px;

  display: flex;
  justify-content: space-between;
  align-items: center;
`;