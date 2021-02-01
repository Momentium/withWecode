import React, { useState } from "react";
import styled from "styled-components";
import RequestModal from "./startupModal/RequestModal";
import ResponseModal from "./startupModal/ResponseModal";
import AuthenticateModal from "./startupModal/AuthenticateModal";

const Modal = ({ onClick }: any) => {
  // 백엔드 유저 데이터 완성되면 정보 받아와서 휴대폰 인증 여부 확인함
  const [currentModal, setCurrentModal] = useState(0);
  const [checkPhoneNumber, setCheckPhoneNumber] = useState(false);

  const goToMypage = () => {
    window.location.replace("/mypage");
  };

  const changeModalCurr = () => {
    if (!checkPhoneNumber) {
      setCurrentModal(2);
    }
  };

  const modalControl = () => {
    switch (currentModal) {
      case 0:
        return <RequestModal />;
      case 1:
        return <ResponseModal />;
      case 2:
        return <AuthenticateModal />;
    }
  };

  const ModalBtnControl = () => {
    switch (currentModal) {
      case 0:
        return (
          <>
            <Button className="yes" onClick={changeModalCurr}>
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
    <ModalBox>
      <CloseBtn onClick={onClick} />
      <Box>
        <Title>IR 자료 요청</Title>
        <Content>
          {modalControl()}
          <Buttons>{ModalBtnControl()}</Buttons>
        </Content>
      </Box>
    </ModalBox>
  );
};

export default Modal;

const ModalBox = styled.div`
  position: absolute;
  width: 960px;
  height: 480px;
  top: 50%;
  left: 50%;
  padding: 64px 80px;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`;

const CloseBtn = styled.div`
  position: absolute;
  width: 17px;
  height: 17px;
  right: 3%;
  top: 5%;
  background-image: url(/images/startupDetail/close.png);
  cursor: pointer;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.div`
  position: absolute;
  color: #5b5b5b;
  font-size: 21px;
  font-weight: bold;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const Buttons = styled.div`
  display: flex;
`;

const Button = styled.button`
  width: 232px;
  height: 48px;
  background: #5541ed 0% 0% no-repeat padding-box;
  border-radius: 3px;
  color: white;
  cursor: pointer;

  &.no {
    background: #ffffff 0% 0% no-repeat padding-box;
    border: 1px solid #5142e4;
    color: #5142e4;
  }

  &.yes {
    margin-right: 24px;
  }
`;
