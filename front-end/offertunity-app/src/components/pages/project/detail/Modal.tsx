import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import * as Mt from "api/methods";
import styled, { css } from "styled-components";
import EditInfo from "../../workstation/startup/applyPjt/EditInfo";

const Modal = ({ handleModal }: any) => {
  const noScroll = () => {
    window.scrollTo(0, 0);
  };
  useEffect(() => {
    window.addEventListener("scroll", noScroll);

    return () => window.removeEventListener("scroll", noScroll);
  }, []);
  return (
    <ModalContainer>
      <ModalCont>
        <EditInfo handleModal={handleModal} />
      </ModalCont>
    </ModalContainer>
  );
};
export default Modal;

const ModalContainer = styled.div`
  position: fixed;
  z-index: 1000;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

const ModalCont = styled.div`
  overflow: scroll;
  width: 80vw;
  height: 80vh;
  padding: 30px 50px 0px 50px;
  background-color: #ffffff;
`;
