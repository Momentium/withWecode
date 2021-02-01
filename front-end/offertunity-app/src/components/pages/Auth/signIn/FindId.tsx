import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Tab from "../components/Tab";
import Question from "../components/Question";
import FinaAccountMainTxt from "../components/FinaAccountMainTxt";

const FindId = () => {
  return (
    <>
      <Header />
      <Tab />
      <Con>
        <Wrap>
          <FinaAccountMainTxt />
          <p>OFFERTUNITY 는 이메일을 계정 아이디로 쓰이고 있습니다.</p>
          <p>
            이메일 정보를 입력하고 [확인]을 클릭하면 가입 여부를 알려드립니다.
          </p>
          <input type="text" placeholder="이메일 계정을 입력해주세요" />
          <Buttons>
            <Link to="/Auth/FindIdAgain">
              {/* 아이디가 있는 경우는  /Auth/FindIdResult 로 이동 */}
              <ChkBtn>확인</ChkBtn>
            </Link>
            <CancleBtn>취소</CancleBtn>
          </Buttons>
          <Link to="/Auth/SignUp">
            <Question
              ask="아직 OFFERTUNITY 회원이 아니신가요?"
              button="회원가입"
            />
          </Link>
        </Wrap>
      </Con>
    </>
  );
};

export default FindId;

const Con = styled.div``;

const Wrap = styled.div`
  display: inline-block;
  margin: 10.94rem 0 0 40rem;
  text-align: left;
  p {
    font-size: 0.9rem;
    line-height: 1.5rem;
  }
  input {
    padding: 0.5rem;
    margin: 2rem 0 1.5rem 0;
    width: 20rem;
    height: 3rem;
    border: 1px solid #b7b7b7;
    border-radius: 0.3rem;
    &::placeholder {
      color: #b7b7b7;
      font-size: 0.9rem;
    }
  }
`;

const Buttons = styled.div`
  margin-bottom: 3.5rem;
`;

const Btn = styled.button`
  width: 9.5rem;
  height: 3rem;
  border-radius: 0.3rem;
  line-height: 3rem;
  text-align: center;
  font-size: 1.125rem;
  cursor: pointer;
`;

const ChkBtn = styled(Btn)`
  margin-right: 1rem;
  background: #5541ed;
  color: #fff;
`;
const CancleBtn = styled(Btn)`
  background: #fff;
  color: #000;
  border: 1px solid #b7b7b7;
`;
