import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useHistory } from "react-router-dom";
import styled from "styled-components";
import Tab from "../components/Tab";
import Question from "../components/Question";
import FinaAccountMainTxt from "../components/FinaAccountMainTxt";

const FindId: React.FC = () => {
  const [email, setEmail] = useState("");
  const history = useHistory();

  const handleInputValue = (event: any) => {
    setEmail(event.target.value);
    console.log(email);
  };

  const handleIsPwExist = () => {
    history.push("/auth/FindIdAgain");
    sessionStorage.setItem("findEmail", email);
    axios
      .post(`${process.env.REACT_APP_URL}/auths/emailfinder`, {
        email: email,
      })
      .then((res) => {
        history.push("/auth/FindIdAgain");
      })
      .catch((err) => {
        history.push("/auth/FindIdResult");
      });
  };

  return (
    <>
      <Tab password="false" id="true" />
      <Con>
        <Wrap>
          <FinaAccountMainTxt />
          <p>OFFERTUNITY 는 이메일을 계정 아이디로 쓰이고 있습니다.</p>
          <p>
            이메일 정보를 입력하고 [확인]을 클릭하면 가입 여부를 알려드립니다.
          </p>
          <input
            type="text"
            placeholder="이메일 계정을 입력해주세요"
            onChange={handleInputValue}
          />
          <Buttons>
            {/* 아이디가 있는 경우는  /auth/FindIdResult 로 이동 */}
            <ChkBtn onClick={handleIsPwExist}>확인</ChkBtn>
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
      </Con>
    </>
  );
};

export default FindId;

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
