import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import InputBox from "../components/InputBox";
import MainTxt from "../components/MainTxt";
import Button from "../components/Button";

const SignupFormPartner: React.FC = () => {
  return (
    <>
      <Header />
      <Wrap>
        <TxtWrap>
          <MainTxt
            subtitle="예비 창업가부터 유니콘 스타트업까지"
            subtitletwo="지원사업과 투자 유치 기회를 만날 수 있습니다."
            title="파트너 회원가입"
          />
          <Link to="/auth/SignupSelectmember">
            <Button txt="다른 회원 선택하기" />
          </Link>
        </TxtWrap>
        <InputBox typeId="2" />
      </Wrap>
    </>
  );
};

export default SignupFormPartner;

const Wrap = styled.section`
  ${({ theme }) => theme.conWidth};
  display: flex;
  justify-content: space-between;
  padding-top: 10rem;
`;

const TxtWrap = styled.div`
  padding-left: 11rem;
`;
