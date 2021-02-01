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
  font-size: 1.313rem;
  margin-bottom: 1.875rem;
`;

const Image = styled.div`
  width: 14.063rem;
  height: 14.375rem;

  img {
    width: 100%;
    height: 100%;
  }
`;
