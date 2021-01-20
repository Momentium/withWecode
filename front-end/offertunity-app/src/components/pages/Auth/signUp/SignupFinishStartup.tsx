import React from 'react';
import styled from "styled-components";
import MainTxt from "../components/MainTxt";

const SignupFinishStartup = () => {
  return (
    <Wrap>
      <MainTxt 
        subtitle="예비 창업가부터 유니콘 스타트업까지" 
        subtitletwo="지원사업과 투자 유치 기회를 만날 수 있습니다." 
        title="스타트업 회원가입 완료"
        />
        <button>로그인</button>
    </Wrap>
  )
};

export default SignupFinishStartup;

const Wrap= styled.section`
  ${({ theme }) => theme.ConWidth};
  padding:19rem 0;

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
