import React from "react";
import styled from "styled-components";

const AuthenticateModal = ({ text }: any) => {
  return (
    <>
      <Content>
        <Image>
          <img src="/images/startupDetail/modal.png" />
        </Image>
        <Description>{text}</Description>
      </Content>
    </>
  );
};

export default AuthenticateModal;

const Title = styled.div`
  width: 100%;
  left: 0;
  color: #5b5b5b;
  font-size: 1.313rem;
  font-weight: bold;
`;

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
