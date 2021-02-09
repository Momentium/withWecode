import React, { useState } from "react";
import styled from "styled-components";
import { useHistory, Link } from "react-router-dom";
import axios from "axios";
import Tab from "../components/Tab";
import Question from "../components/Question";
import FinaAccountMainTxt from "../components/FinaAccountMainTxt";
import Modal from "../components/Modal";

const FindPw = () => {
  const [modal, setModal] = useState(false);
  const [email, setEmail] = useState("");
  const history = useHistory();

  const handleInput = (event: any) => {
    setEmail(event.target.value);
  };

  const isPwExist = () => {
    axios
      .post("http://10.0.1.41:3000/auths/emailresetpassword", {
        email: email,
      })
      .then((res) => {
        alert("새로운 비밀번호가 이메일로 발송 되었습니다");
        history.push("/auth/SignIn");
      })
      .catch((err) => {
        setModal(!modal);
      });
  };
  console.log(modal);
  return (
    <>
      <Tab password="true" id="false" />
      <Con>
        <Wrap>
          <FinaAccountMainTxt />
          <p>
            가입했던 이메일 계정을 입력하면, 새로운 비밀번호를 이메일로
            발송해드려요.
          </p>
          <input
            type="text"
            placeholder="이메일 계정을 입력해주세요"
            onChange={handleInput}
          />
          <Buttons>
            <ChkBtn onClick={isPwExist}>확인</ChkBtn>
            <Link to="/">
              <CancleBtn>취소</CancleBtn>
            </Link>
          </Buttons>
          <Link to="/auth/SignUp">
            <Question
              ask="아직 OFFERTUNITY 회원이 아니신가요?"
              button="회원가입"
            />
          </Link>
        </Wrap>
        {modal && (
          <Modal
            title="비밀번호 찾기"
            content={email}
            notionOne="입력해주신 정보는 등록되지 않은 이메일 계정입니다."
            notionTwo="다른계정 혹은 회원가입을 해주세요."
          />
        )}
      </Con>
    </>
  );
};

export default FindPw;

const Con = styled.div`
  text-align: center;
`;

const Wrap = styled.div`
  display: inline-block;
  margin-top: 7rem;
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
