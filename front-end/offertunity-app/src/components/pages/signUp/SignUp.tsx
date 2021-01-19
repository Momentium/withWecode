import React from 'react';
import styled from "styled-components";
import MainTxt from "./components/MainTxt";
import Naver from "./logoIcons/Naver"
import Kakao from "./logoIcons/Kakao"
import Facebook from "./logoIcons/Facebook"
import Or from "./components/Or"
import Question from "./components/Question"

const SignUp:React.FC = () => {
  return (
    <Wrap>
      <MainTxt 
      subtitle="지원사업부터 투자까지 기회를 찾을수 있는" 
      subtitletwo="" 
      title="OFFERTUNITY"/>
      <Con>
        <Btn>
        <i className="fab fa-google"/>
          Google 계정 회원가입
        </Btn>
        <Icon>
          <Naver/>
          <Kakao/>
          <Facebook/>
        </Icon>
        <Or />
        <Btn style={{margin:"3.5rem 0 5rem 0"}}>
        <i className="far fa-envelope"/>
          이메일로 회원가입
        </Btn>
        <Question ask="이미 오퍼튜니티 회원이신가요?" button="로그인"/>
      </Con>
    </Wrap>
  )
};

export default SignUp;

const Wrap= styled.section`
  ${({ theme }) => theme.ConWidth};
  display:flex;
  align-items: center;
  justify-content:space-between;
  padding:17rem 0;
`;

const Con = styled.div`
  display: inline-block;
  text-align:center;
`;

const Btn = styled.button`
  padding:2.1rem 0;
  width:29.8rem;
  border:1px solid black;
  border-radius:0.8rem;
  font-size:1.8rem;
  cursor: pointer;
  i{
    margin-right:1.75rem;
  }
`;

const Icon =styled.div`
  margin:2.131rem 0;
`;



