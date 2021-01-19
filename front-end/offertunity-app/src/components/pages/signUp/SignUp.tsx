import React from 'react';
import styled from "styled-components";
import MainTxt from "./MainTxt"

const SignUp:React.FC = () => {
  return (
    <Wrap>
      <MainTxt subtitle="지원사업부터 투자까지 기회를 찾을수 있는" title="OFFERTUNITY"/>
      <Con>
        <Btn>
        <i className="fab fa-google"/>
          Google 계정 회원가입
        </Btn>
        <LogoBtn>
          <button>네이버</button>
          <button>카카오</button>
          <button>페이스북</button>
        </LogoBtn>

        <Btn>
        <i className="far fa-envelope"/>
          이메일로 회원가입
        </Btn>
      </Con>
    </Wrap>
  )
};

export default SignUp;

const Wrap= styled.section`
${({ theme }) => theme.ConWidth}
`;

const Con = styled.div`
  display: inline-block;
`;

const Btn = styled.button`
  padding:2.1rem 0;
  width:29.8rem;
  border:1px solid black;
  border-radius:0.8rem;
  font-size:1.8rem;
  i{
    margin-right:1.75rem;
  }
`;

const LogoBtn = styled.div``;

