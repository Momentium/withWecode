import React, { useState } from "react";
import RequestModal from "./RequestModal";
import ResponseModal from "./ResponseModal";
import AuthenticateModal from "../AuthenticateModal";
import styled from "styled-components";

const StartupModal = ({ goToMypage, title, onClick }: any) => {
  const [checkPhoneNumber, setCheckPhoneNumber] = useState(false);
  const [currentModal, setCurrentModal] = useState(0);

  const handleRequest = () => {
    if (!checkPhoneNumber) {
      setCurrentModal(2);
    } else {
      setCurrentModal(1);
    }
  };

  const modalControl = () => {
    switch (currentModal) {
      case 0:
        return <RequestModal />;
      case 1:
        return <ResponseModal title={title} />;
      case 2:
        return (
          <AuthenticateModal
            text={"IR 요청은 휴대 전화가 인증된 파트너 회원만 가능합니다."}
          />
        );
    }
  };

  const ModalBtnControl = () => {
    switch (currentModal) {
      case 0:
        return (
          <>
            <Button className="yes" onClick={handleRequest}>
              예
            </Button>
            <Button className="no" onClick={onClick}>
              아니오
            </Button>
          </>
        );
      case 1:
        return (
          <>
            <Button onClick={onClick}>확인</Button>
          </>
        );
      case 2:
        return (
          <>
            <Button className="yes" onClick={goToMypage}>
              인증하기
            </Button>
            <Button className="no" onClick={onClick}>
              취소하기
            </Button>
          </>
        );
    }
  };

  return (
    <>
      <Title>IR 자료 요청</Title>
      {modalControl()}
      <Buttons>{ModalBtnControl()}</Buttons>
    </>
  );
};
export default StartupModal;

const Title = styled.div`
  width: 100%;
  left: 0;
  color: #5b5b5b;
  font-size: 1.313rem;
  font-weight: bold;
`;

const Buttons = styled.div`
  display: flex;
`;

const Button = styled.button`
  width: 14.5rem;
  height: 3rem;
  border-radius: 0.188rem;
  color: white;
  background-color: #5541ed;
  cursor: pointer;

  &.no {
    border: 1px solid #5142e4;
    color: #5142e4;
    background-color: #ffffff;
  }

  &.yes {
    margin-right: 1.5rem;
  }
`;
