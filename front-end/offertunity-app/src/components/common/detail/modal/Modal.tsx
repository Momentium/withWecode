import React from "react";
import styled from "styled-components";
import StartupModal from "./startupModal/StartupModal";
import PartnerModal from "./partnerModal/PartnerModal";

const Modal = ({ onClick, title, type }: any) => {
  // 백엔드 유저 데이터 완성되면 정보 받아와서 휴대폰 인증 여부 확인함

  const goToMypage = () => {
    window.location.replace("/mypage");
  };

  /*
      axios get 요청
    */
  /*
  useEffect로 핸드폰 번호 검사해야함
  */

  return (
    <ModalBox>
      <CloseBtn onClick={onClick} />
      <Box>
        <Content>
          {type === "startup" ? (
            <StartupModal
              goToMypage={goToMypage}
              title={title}
              onClick={onClick}
            />
          ) : (
            <PartnerModal
              goToMypage={goToMypage}
              title={title}
              onClick={onClick}
            />
          )}
        </Content>
      </Box>
    </ModalBox>
  );
};

export default Modal;

const ModalBox = styled.div`
  position: absolute;
  width: 60rem;
  top: 50%;
  left: 50%;
  padding: 4rem 5rem;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  background-color: #ffffff;
`;

const CloseBtn = styled.div`
  position: absolute;
  width: 1.063rem;
  height: 1.063rem;
  right: 3%;
  top: 5%;
  background-image: url(/images/startupDetail/close.png);
  cursor: pointer;
`;

const Box = styled.div`
  display: flex;
  flex-direction: column;
`;

const Content = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;