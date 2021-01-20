import React from 'react';
import styled from "styled-components";
import InputBox from "../components/InputBox"
import MainTxt from "../components/MainTxt"
import Button from "../components/Button"
import Modal from "../components/Modal"

const SignupFormStartup:React.FC = () => {
  return(
    <>
    <Wrap>
      <TxtWrap>
        <MainTxt 
        subtitle="예비 창업가부터 유니콘 스타트업까지" 
        subtitletwo="지원사업과 투자 유치 기회를 만날 수 있습니다."
        title="스타트업 회원가입"
        />
        <Button txt="다른 회원 선택하기"/>
      </TxtWrap>
      <InputBox />
    </Wrap>
    <Modal 
    title="이메일 인증하기" 
    content="22312@asnj.com" 
    notionOne="입력해주신 정보는 등록되지 않은 이메일 계정입니다." 
    notionTwo="다른 계정 혹은 회원가입을 해주세요."
    />
    </>
    
  )
};

export default SignupFormStartup;

const Wrap= styled.section`
  ${({ theme }) => theme.ConWidth};
  display:flex;
  justify-content:space-between;
  padding:15rem 0;
`;

const TxtWrap = styled.div`
  padding-left:7rem;
`;


