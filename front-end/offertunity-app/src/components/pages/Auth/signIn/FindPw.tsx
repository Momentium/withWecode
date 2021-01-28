import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Tab from "../components/Tab";
import Question from "../components/Question";
import FinaAccountMainTxt from "../components/FinaAccountMainTxt";
import Modal from "../components/Modal";

const FindPw = () => {
  const [modal, setModal] = useState(false);
  console.log(modal);
  return (
    <>
      <Header />
      <Tab />
      <Con>
        <Wrap>
          <FinaAccountMainTxt />
          <p>
            가입했던 이메일 계정을 입력하면, 새로운 비밀번호를 이메일로
            발송해드려요.
          </p>
          <input type="text" placeholder="이메일 계정을 입력해주세요" />
          <Buttons>
            <ChkBtn
              onClick={() => {
                setModal(!modal);
              }}
            >
              확인
            </ChkBtn>
            <CancleBtn>취소</CancleBtn>
          </Buttons>
          <Link to="/Auth/SignUp">
            <Question
              ask="아직 OFFERTUNITY 회원이 아니신가요?"
              button="회원가입"
            />
          </Link>
        </Wrap>
        {modal && (
          <Modal
            title="비밀번호 찾기"
            content="22312@asnj.com"
            notionOne="입력해주신 정보는 등록되지 않은 이메일 계정입니다."
            notionTwo="다른계정 혹은 회원가입을 해주세요."
          />
        )}
      </Con>
    </>
  );
};

export default FindPw;

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
