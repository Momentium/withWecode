import React from "react";
import styled from "styled-components";

const TitleWithMsg = ({ title, msg }: any) => {
  return (
    <>
      <Title>{title}</Title>
      <NoticeMsg>{msg}</NoticeMsg>
    </>
  );
};

export default TitleWithMsg;

const Title = styled.div`
  margin-bottom: 1.5rem;
  font-weight: bold;
  font-size: 1.75rem;
`;

const NoticeMsg = styled.span`
  margin-bottom: 1.5rem;
  font-size: 1.125rem;
  color: #9f9f9f;
`;
