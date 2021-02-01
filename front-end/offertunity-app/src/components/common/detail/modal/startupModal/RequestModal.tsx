import React, { useState } from "react";
import styled from "styled-components";

const RequestModal = () => {
  return (
    <Content>
      <Image>
        <img src="/images/startupDetail/modal.png" />
      </Image>
      <Description>IR자료 요청을 진행하시겠습니까?</Description>
    </Content>
  );
};

export default RequestModal;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Description = styled.div`
  font-weight: bold;
  font-size: 21px;
  margin-bottom: 30px;
`;

const Image = styled.div`
  width: 225px;
  height: 230px;

  img {
    width: 100%;
    height: 100%;
  }
`;
