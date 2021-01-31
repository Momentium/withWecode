import React from "react";
import styled from "styled-components";

const ResponseModal = ({ title }: any) => {
  return (
    <>
      <Title>IR 자료 전송 완료</Title>
      <Content>
        <Description>
          <p>{title}</p>
          <span>
            IR 자료 전송을 완료했습니다.
            <br />
            검토 결과에 따라 이메일로 안내해드리겠습니다.
          </span>
        </Description>
      </Content>
    </>
  );
};

export default ResponseModal;

const Title = styled.div`
  width: 100%;
  left: 0;
  color: #5b5b5b;
  font-size: 1.313rem;
  font-weight: bold;
`;

const Content = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Description = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  margin-top: 4.938rem;
  margin-bottom: 3.5rem;

  p {
    margin-bottom: 3.5rem;
    font-size: 2.25rem;
    font-weight: bold;
  }

  span {
    font-size: 0.938rem;
    margin-top: 0.5rem;
    font-weight: normal;
    text-align: center;
  }
`;
