import React from "react";
import styled from "styled-components";

const AuthenticateModal = () => {
  return (
    <Content>
      <Image>
        <img src="/images/startupDetail/modal.png" />
      </Image>
      <Description>
        IR 요청은 휴대 전화가 인증된 파트너 회원만 가능합니다.
      </Description>
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
