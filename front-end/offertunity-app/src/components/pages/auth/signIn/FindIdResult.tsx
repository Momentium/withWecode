import React from "react";
import * as reactRouterDom from "react-router-dom";
import styled from "styled-components";

import Tab from "../components/Tab";

const FindIdResult = () => {
  return (
    <>
      <Tab password="false" id="true" />
      <Con>
        <Wrap>
          <span>asdhadjh@dlksjld</span>
          <p>입력하신 이메일 주소는 OFFERTUNITY에 등록되어 있지 않습니다.</p>
          <p>
            아직 회원이 아니라면 아래 [회원가입하기] 버튼을 통해 회원가입을
            완료해 주세요.
          </p>
          <reactRouterDom.Link to="/auth/SignUp">
            <ChkBtn>회원가입</ChkBtn>
          </reactRouterDom.Link>
          <reactRouterDom.Link to="/auth/FindId">
            <CancleBtn>다시찾아보기</CancleBtn>
          </reactRouterDom.Link>
        </Wrap>
      </Con>
    </>
  );
};

export default FindIdResult;

const Con = styled.div`
  text-align: center;
`;

const Wrap = styled.div`
  display: inline-block;
  margin-top: 10.94rem;
  text-align: left;
  span {
    display: inline-block;
    padding-bottom: 4rem;
    font-size: 1.75rem;
    font-weight: bold;
  }
  p {
    font-size: 0.9rem;
    line-height: 1.5rem;
  }
`;

const Btn = styled.button`
  display: block;
  width: 20rem;
  height: 3rem;
  border-radius: 0.3rem;
  line-height: 3rem;
  text-align: center;
  font-size: 0.9rem;
  cursor: pointer;
`;

const ChkBtn = styled(Btn)`
  margin: 2rem 0 1.5rem 0;
  background: #5541ed;
  color: #fff;
`;
const CancleBtn = styled(Btn)`
  background: #fff;
  color: #898989;
  border: 1px solid #b7b7b7;
`;
