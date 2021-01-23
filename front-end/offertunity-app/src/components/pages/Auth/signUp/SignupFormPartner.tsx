import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import Header from "../components/Header"
import InputBox from "../components/InputBox"
import MainTxt from "../components/MainTxt"
import Button from "../components/Button"

const SignupFormPartner:React.FC = () => {
  return(
    <>
    <Header />
    <Wrap>
      <TxtWrap>
        <MainTxt 
        subtitle="예비 창업가부터 유니콘 스타트업까지" 
        subtitletwo="지원사업과 투자 유치 기회를 만날 수 있습니다."
        title="파트너 회원가입"
        />
        <Link to="/Auth/SignupSelectmember">
          <Button txt="다른 회원 선택하기"/>
        </Link>
      </TxtWrap>
      <Con>
        <InputBox />
        <div>
          <Link to="/Auth/SignupFinishPartner">
             <Enroll>가입</Enroll>
          </Link>
          <Cancle>취소</Cancle>
        </div>
      </Con>
    </Wrap>
    </>
  )
};

export default SignupFormPartner;

const Wrap= styled.section`
  ${({ theme }) => theme.ConWidth};
  display:flex;
  justify-content:space-between;
  padding:15rem 0;
`;

const TxtWrap = styled.div`
  padding-left:11rem;
`;

const Con = styled.div`
  width:41%;
`;

const BTN = styled.button`
  width:9.5rem;
  height:3rem;
  font-size:1.12rem;
  line-height:3rem;
  text-align:center;
  border-radius:0.3rem;
  cursor: pointer;
`;

const Enroll = styled(BTN)`
  margin-right:1rem;
  background-color:#5541ED;
  color:#fff;
`;

const Cancle = styled(BTN)`
  background-color:#fff;
  border:1px solid #B7B7B7;
  color:#000;
`;
