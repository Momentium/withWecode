import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import MainTxt from "../components/MainTxt";
import Naver from "../logoIcons/Naver";
import Kakao from "../logoIcons/Kakao";
import Facebook from "../logoIcons/Facebook";
import Or from "../components/Or";
import Question from "../components/Question";

const SignUp: React.FC = () => {
  const handleGOOGLE = () => {
    window.location.href = "http://10.0.1.29:3000/users/google";
  };

  return (
    <>
      <Header />
      <Wrap>
        <Bg>
          <MainTxt
            subtitle="지원사업부터 투자까지 기회를 찾을수 있는"
            subtitletwo=""
            title=""
          />
        </Bg>
        <Con>
          <BtnGoogle onClick={handleGOOGLE}>구글로 회원가입</BtnGoogle>
          <Icon>
            <Naver />
            <Kakao />
            <Facebook />
          </Icon>
          <Or />
          <BtnEmail>이메일로 회원가입</BtnEmail>
          <Link to="/Auth/SignIn">
            <Question ask="이미 오퍼튜니티 회원이신가요?" button="로그인" />
          </Link>
        </Con>
      </Wrap>
    </>
  );
};

export default SignUp;

const Wrap = styled.section`
  ${({ theme }) => theme.ConWidth};
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15rem 0;
`;

const Con = styled.div`
  display: inline-block;
  width: 50%;
  text-align: center;
`;

const Btn = styled.button`
  padding: 0.9rem 0;
  width: 20rem;
  border-radius: 0.5rem;
  font-size: 0.9rem;
  cursor: pointer;
`;

const BtnGoogle = styled(Btn)`
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
