import React from 'react';
import styled from "styled-components";
import Box from "./components/Box"

const SignupSelectmember:React.FC = () => {
  return(
    <Wrap>
      <Box 
      SubtitleOne="지원사업부터 투자유치 까지" 
      SubtitleTwo="기회를 찾고 있다면?" 
      title="스타트업 회원" 
      ex="예비 창업, 유니톤 기업 등"/>
      <Box 
      SubtitleOne="성장 가능성과 실행력을 가진" 
      SubtitleTwo="좋은 스타트업을 찾고 있다면?" 
      title="파트너 회원" 
      ex="지원기관, 투자기관 등"/>
    </Wrap>
  )
};

export default SignupSelectmember;

const Wrap= styled.section`
  ${({ theme }) => theme.ConWidth};
  display:flex;
  align-items: center;
  justify-content:space-between;
  padding:15rem 0;
`;