import React from 'react';
import styled from "styled-components";
import Header from "../components/Header"
import Tab from "../components/Tab"


const FindIdResult = () => {
  return(
    <>
    <Header />
    <Tab />
    <Con>
      <Wrap>
        <span>asdhadjh@dlksjld</span>
        <p>OFFERTUNITY 는 이메일을 계정 아이디로 쓰이고 있습니다.</p>
        <p>이메일 정보를 입력하고 [확인]을 클릭하면 가입 여부를 알려드립니다.</p>
        <ChkBtn>회원가입</ChkBtn>
        <CancleBtn>다시찾아보기</CancleBtn>
      </Wrap>
    </Con>
    </>
  )
};

export default FindIdResult;

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