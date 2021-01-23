import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Header from "../components/Header"
import MainTxt from "../components/MainTxt";

const SignupFinishPartner = () => {
  return (
    <>
    <Header />
    <Wrap>
      <MainTxt 
        subtitle="예비 창업가부터 유니콘 스타트업까지" 
        subtitletwo="지원사업과 투자 유치 기회를 만날 수 있습니다." 
        title="파트너 회원가입 완료"
        />
        <Link to="/Auth/SignIn">
          <button>로그인</button>
        </Link>
    </Wrap>
    </>
  )
};

export default SignupFinishPartner;

const Wrap= styled.section`
  ${({ theme }) => theme.ConWidth};
  padding:19rem 0 19rem 12rem;

  button{
    display:block;
    margin-top:6rem;
    width:9.5rem;
    height:3rem;
    border-radius:0.3rem;
    background:#5541ED;
    color:#fff;
    cursor:pointer;
  }
`;
