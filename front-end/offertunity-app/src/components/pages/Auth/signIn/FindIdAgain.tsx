import React from 'react';
import styled from "styled-components";
import Header from "../components/Header"
import Tab from "../components/Tab"


const FindIdAgain = () => {
  return(
    <>
    <Header />
    <Tab />
    <Con>
      <Wrap>
        <span>asdhadjh@dlksjld</span>
        <p>OFFERTUNITY의 소중한 회원님이셨군요!</p>
        <p>아래 [로그인] 버트을 통해 OFFERTUNITY에 로그인해주세요.</p>
        <ChkBtn>로그인</ChkBtn>
        <CancleBtn>다시찾아보기</CancleBtn>
      </Wrap>
    </Con>
    </>
  )
};

export default FindIdAgain;

const Con = styled.div`
  text-align:center;
`;

const Wrap = styled.div`
  display: inline-block;
  margin-top:10.94rem;
  text-align:left;
  span{
    display: inline-block;
    padding-bottom:4rem;
    font-size:1.75rem;
    font-weight:bold;
  }
  p{
    font-size:0.9rem;
    line-height:1.5rem;
  }
`;


const Buttons = styled.div`
  margin-bottom:3.5rem;
`;

const Btn = styled.button`
  display: block;
  width:20rem;
  height:3rem;
  border-radius:0.3rem;
  line-height:3rem;
  text-align:center;
  font-size:0.9rem;
  cursor:pointer;
`;

const ChkBtn = styled(Btn)`
  margin:2rem 0 1.5rem 0;
  background:#5541ED;
  color:#fff;
`;
const CancleBtn = styled(Btn)`
  background:#fff;
  color:#898989;
  border:1px solid #B7B7B7;
`;