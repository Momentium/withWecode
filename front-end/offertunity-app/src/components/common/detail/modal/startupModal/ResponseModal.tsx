import React from "react";
import styled from "styled-components";

const ResponseModal = ({ title }: any) => {
  return (
    <Content>
      <Image>
        <img src="/images/startupDetail/donemodal.png" />
      </Image>
      <Description>
        IR 자료 요청이 완료되었습니다.
        <span>(주){title}에 소중한 기회를 제공해주셔서 감사합니다.</span>
      </Description>
    </Content>
  );
};

export default ResponseModal;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Description = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  font-weight: bold;
  font-size: 1.313rem;
  margin-bottom: 1.5rem;

  span {
    font-size: 0.938rem;
    margin-top: 0.5rem;
    font-weight: normal;
  }
`;

const Image = styled.div`
  width: 14.063rem;
  height: 14.375rem;

  img {
    width: 100%;
    height: 100%;
  }
`;
