import React, { useEffect, useState } from "react";
import styled from "styled-components";
import RequestModal from "./ReuqestModal";
import ResponseModal from "./ResponseModal";
import AuthenticateModal from "../AuthenticateModal";

const PartnerModal = ({ goToMypage, title, onClick }: any) => {
  const [checkPhoneNumber, setCheckPhoneNumber] = useState(false);
  const [currentModal, setCurrentModal] = useState(0);
  const [btnDisabled, setBtnDisabled] = useState<Boolean>(false);

  // useEffect(() => {
  //   if (!checkPhoneNumber) {
  //     setCurrentModal(2);
  //   }
  // }, []);

  const handleChange = (btnDisabled: Boolean) => {
    setBtnDisabled(btnDisabled);
  };

  const handleRequest = (data: any) => {
    /* axios 자료 전달 */
    console.log(data);
  };

  const modalControl = () => {
    switch (currentModal) {
      case 0:
        return (
          <RequestModal
            title={title}
            onChange={handleChange}
            onClick={handleRequest}
          />
        );
      case 1:
        return <ResponseModal title={title} />;
      case 2:
        return (
          <AuthenticateModal
            text={
              "IR 자료 전달은 휴대 전화가 인증된 스타트업 회원만 이용가능 합니다."
            }
          />
        );
    }
  };

  const ModalBtnControl = () => {
    switch (currentModal) {
      case 0:
        return (
          <>
            {btnDisabled ? (
              <Button className="yes" onClick={handleRequest}>
                IR 자료 보내기
              </Button>
            ) : (
              <Button className="yes disabled" disabled>
                IR 자료 보내기
              </Button>
            )}
            <Button className="no" onClick={onClick}>
              취소
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
      {modalControl()}
      <Buttons>{ModalBtnControl()}</Buttons>
    </>
  );
};
export default PartnerModal;

const Buttons = styled.div`
  display: flex;
`;

const Button = styled.button`
  width: 232px;
  height: 48px;
  background-color: #5541ed;
  border-radius: 3px;
  color: white;
  cursor: pointer;

  &.no {
    background-color: #ffffff;
    border: 1px solid #5142e4;
    color: #5142e4;
  }

  &.yes {
    margin-right: 24px;
  }

  &.disabled {
    background-color: gray;
    cursor: default;
  }
`;
