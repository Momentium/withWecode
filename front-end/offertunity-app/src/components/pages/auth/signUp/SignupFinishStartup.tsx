import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

import MainTxt from "../components/MainTxt";

const SignupFinishStartup = () => {
  return (
    <>
      <Wrap>
        <MainTxt
          subtitle="예비 창업가부터 유니콘 스타트업까지"
          subtitletwo="지원사업과 투자 유치 기회를 만날 수 있습니다."
          title="스타트업 회원가입 완료"
        />
        <Link to="/auth/SignIn">
          <button>로그인</button>
        </Link>
      </Wrap>
    </>
  );
};

export default SignupFinishStartup;

const Wrap = styled.section`
  ${({ theme }) => theme.conWidth};
  padding: 19rem 0 19rem 12rem;

  button {
    display: block;
    margin-top: 6rem;
    width: 9.5rem;
    height: 3rem;
    border-radius: 0.3rem;
    background: #5541ed;
    color: #fff;
    cursor: pointer;
  }
`;