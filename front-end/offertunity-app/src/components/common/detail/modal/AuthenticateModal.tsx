import React from "react";
import styled from "styled-components";

const AuthenticateModal = ({ text }: any) => {
  return (
    <Content>
      <Image>
        <img src="/images/startupDetail/modal.png" />
      </Image>
      <Description>{text}</Description>
    </Content>
  );
};

export default AuthenticateModal;

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
