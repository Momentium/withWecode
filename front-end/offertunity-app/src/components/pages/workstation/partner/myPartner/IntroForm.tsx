import React, { useState, useEffect } from 'react';
import styled, { css } from "styled-components";
import * as St from "components/styles/styledComp";
import Necessary from 'components/common/message/Necessary';


const IntroForm:React.FC<any>= ({ title }) => {

  const [txt, setTxt] = useState<string>("");
  const changeVal = (e:any) => {
    setTxt(e.currentTarget.value);
  }

  return (
    <StCont>
      <St.SectionTitle>{title}&nbsp;&nbsp;&nbsp;<Necessary mode/></St.SectionTitle>
      <StGuideDiv>최대 500자까지 작성할 수 있습니다.</StGuideDiv>
      <StTxtarea placeholder={`${title}를 작성해주세요.`}
        value={txt} 
        onChange={changeVal}
      />
      <div className="flex-div">
        <StLetCntDiv>&nbsp;</StLetCntDiv>
        <StLetCntDiv>{`${txt.length} / 500 자`}</StLetCntDiv>
      </div>
    </StCont>
  );
}
export default IntroForm;

const StCont = styled.div`
  margin-bottom: 48px;

  .flex-div {
    display: flex;
    justify-content: flex-end;
  }
`;

const StGuideDiv = styled.div`
  margin: 24px 0;
  font-size: 15px;
  color: #9F9F9F;
`;

const StTxtarea = styled.textarea`
  width: 100%;
  height: 312px;
  padding: 24px;

  font-size: 18px;

  &::placeholder {
    color: #898989;
  }
`;

const StLetCntDiv = styled.div`
  font-size: 15px;
  color: #5B5B5B;

  margin-top: 16px;
`;
