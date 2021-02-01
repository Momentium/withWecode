import React from "react";
import styled from "styled-components";

const ResponseModal = () => {
  return (
    <Content>
      <Image>
        <img src="/images/startupDetail/donemodal.png" />
      </Image>
      <Description>
        IR 자료 요청이 완료되었습니다.
        <span>(주)오퍼튜니티에 소중한 기회를 제공해주셔서 감사합니다.</span>
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
  font-size: 21px;
  margin-bottom: 24px;

  span {
    font-size: 15px;
    margin-top: 8px;
    font-weight: normal;
  }
`;

const Image = styled.div`
  width: 225px;
  height: 230px;

  img {
    width: 100%;
    height: 100%;
  }
`;
