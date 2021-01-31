import React from "react";
import styled from "styled-components";

const ResponseModal = ({ title }: any) => {
  return (
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
  );
};

export default ResponseModal;

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
  margin-top: 79px;
  margin-bottom: 56px;

  p {
    margin-bottom: 56px;
    font-size: 36px;
    font-weight: bold;
  }

  span {
    font-size: 15px;
    margin-top: 8px;
    font-weight: normal;
    text-align: center;
  }
`;
