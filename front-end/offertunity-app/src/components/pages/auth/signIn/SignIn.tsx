import axios from "axios";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import styled from "styled-components";
import MainTxt from "../components/MainTxt";
import Naver from "../logoIcons/Naver";
import Kakao from "../logoIcons/Kakao";
import Facebook from "../logoIcons/Facebook";
import Or from "../components/Or";
import Question from "../components/Question";

const SignIn: React.FC = () => {
  const history = useHistory();
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });
  const SIGNIN = () => {
    const { email, password } = inputs;
    axios
      .post(`${process.env.REACT_APP_URL}/users/signin`, {
        email: email,
        password: password,
      })
      .then(function (response) {
        alert("로그인 성공");
        const _resData = response.data;
        const _userInfo: {} = {
          id: _resData.id,
          email: _resData.email,
          name: _resData.name,
          type_id: _resData.type_id,
        };
        sessionStorage.setItem("token", response.data.token);
        sessionStorage.setItem("userInfo", JSON.stringify(_resData));
        console.log(JSON.parse(String(sessionStorage.getItem("userInfo"))));

        window.location.href = "/";
      })
      .catch(function (error) {
        alert("로그인 실패");
      });
  };
  const handleEmail = (event: any) => {
    event.preventDefault();
    const { value } = event.target;
    setInputs({
      ...inputs,
      email: value,
    });
  };
  const handlePw = (event: any) => {
    event.preventDefault();
    const { value } = event.target;
    setInputs({
      ...inputs,
      password: value,
    });
  };
  const handleGOOGLE = () => {
    window.location.href = `${process.env.REACT_APP_URL}/users/google`;
  };
  return (
    <>
      <Wrap>
        <Bg>
          <MainTxt
            subtitle="지원사업부터 투자까지 기회를 찾을수 있는"
            subtitletwo=""
            title=""
          />
        </Bg>
        <Con>
          <H2>로그인</H2>
          <InputBox>
            <input
              id="id"
              type="text"
              placeholder="이메일 아이디를 입력해주세요"
              onChange={handleEmail}
            />
            <input
              id="password"
              type="password"
              placeholder="비밀번호(영문,숫자,특수문자 포함 8자 이상)"
              onChange={handlePw}
            />
          </InputBox>
          <FindAccount>
            <label>
              <input type="checkbox" />
              아이디 저장
            </label>
            <Link to="/auth/FindId">
              <button>아이디 / 비밀번호 찾기</button>
            </Link>
          </FindAccount>
          <BtnEmail onClick={SIGNIN}>로그인</BtnEmail>
          <Or />
          <BtnGoogle onClick={handleGOOGLE}>Google 계정 로그인</BtnGoogle>
          <Icon>
            <Naver />
            <Kakao />
            <Facebook />
          </Icon>
          <Link to="/auth/SignUp">
            <Question
              ask="아직 OFFERTUNITY 회원이 아니신가요?"
              button="회원가입"
            />
          </Link>
        </Con>
      </Wrap>
    </>
  );
};
export default SignIn;
const Wrap = styled.section`
  ${({ theme }) => theme.conWidth};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 10rem;
`;
const Con = styled.div`
  display: inline-block;
  width: 50%;
  text-align: center;
`;
const Btn = styled.button`
  padding: 0.9rem 0;
  width: 20rem;
  border-radius: 0.3rem;
  font-size: 0.9rem;
  cursor: pointer;
`;
const BtnGoogle = styled(Btn)`
  margin-top: 2.18rem;
  color: #5b5b5b;
  border: 1px solid #5b5b5b;
  background-image: url("/images/signup/googleLogo.png");
  background-size: 1.8rem;
  background-repeat: no-repeat;
  background-position: 1rem;
`;
const BtnEmail = styled(Btn)`
  margin: 1.5rem 0 2.18rem 0;
  color: #fff;
  background-color: #5541ed;
`;
const Icon = styled.div`
  margin: 2rem 0 1rem 0;
`;
const Bg = styled.div`
  width: 44rem;
  height: 29rem;
  background-image: url("/images/signup/offertunity.png");
  background-size: contain;
  background-repeat: no-repeat;
  background-position-x: 4rem;
  background-position-y: 5rem;
  text-align: center;
  p {
    margin-left: 7rem;
    font-size: 2rem;
  }
`;
const H2 = styled.p`
  font-size: 2.25rem;
  font-weight: bold;
`;
const InputBox = styled.div`
  display: inline-block;
  width: 20rem;
  input {
    padding: 0.5rem;
    width: 100%;
    height: 3rem;
    border: 1px solid #d8d8d8;
    border-radius: 0.3rem;
    &::placeholder {
      color: #d8d8d8;
      font-size: 0.93rem;
    }
    &:first-child {
      margin: 1.5rem 0 0.93rem 0;
    }
  }
`;
const FindAccount = styled.div`
  margin-top: 1.5rem;
  margin-left: 8.7rem;
  width: 20rem;
  font-size: 0.8rem;
  color: #898989;
  button {
    padding: 0 1rem 0 6rem;
    font-size: 0.8rem;
    color: #898989;
    background-image: url("/images/signup/arrow.png");
    background-repeat: no-repeat;
    background-size: 0.4rem;
    background-position: right;
    cursor: pointer;
  }
`;