import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Header from "../components/Header";
import Box from "../components/Box";

const SignupSelectmember: React.FC = () => {
  return (
    <>
      <Header />
      <Wrap>
        <Startup>
          <Link to="/Auth/SignupFormStartup">
            <Box
              SubtitleOne="지원사업부터 투자유치 까지"
              SubtitleTwo="기회를 찾고 있다면?"
              title="스타트업 회원"
              ex="예비 창업, 유니톤 기업 등"
            />
          </Link>
        </Startup>
        <Partner>
          <Link to="/Auth/SignupFormPartner">
            <Box
              SubtitleOne="성장 가능성과 실행력을 가진"
              SubtitleTwo="좋은 스타트업을 찾고 있다면?"
              title="파트너 회원"
              ex="지원기관, 투자기관 등"
            />
          </Link>
        </Partner>
      </Wrap>
    </>
  );
};

export default SignupSelectmember;

const Wrap = styled.section`
  ${({ theme }) => theme.conWidth};
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 15rem 0;
`;

const Bg = styled.div`
  background-size: contain;
  background-repeat: no-repeat;
  background-position: bottom;
`;

const Startup = styled(Bg)`
  margin-left: 12rem;
  background-image: url("/images/signup/startupBg.png");
`;

const Partner = styled(Bg)`
  margin-right: 9rem;
  background-image: url("/images/signup/partnerBg.png");
`;
