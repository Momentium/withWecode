import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Modal from "../modal/Modal";

const Buttons = ({ boxStyle, title, type }: any) => {
  const [visible, setVisible] = useState(false);
  const [btnInvisible, setBtnInvisible] = useState(false);
  const [text, setText] = useState("");

  useEffect(() => {
    if (!sessionStorage.getItem("token")) {
      setBtnInvisible(true);
    }
  }, []);

  useEffect(() => {
    if (type === "startup") {
      setText("IR 자료 요청하기");
    } else if (type === "partner") {
      setText("IR자료 검토 요청");
    }
  }, []);

  const handleModal = () => {
    setVisible(!visible);
  };

  return (
    <>
      <BtnBox style={boxStyle}>
        {btnInvisible ? (
          <Btn className="disabled">{text}</Btn>
        ) : (
          <Btn onClick={handleModal}>{text}</Btn>
        )}
      </BtnBox>
      {visible && (
        <ModalContainer>
          <Modal onClick={handleModal} title={title} type={type} />
        </ModalContainer>
      )}
    </>
  );
};

export default Buttons;

const BtnBox = styled.div`
  display: flex;
  align-items: center;
`;

const Btn = styled.button`
  width: 18.75rem;
  height: 3.5rem;
  border-radius: 5px;
  background-color: #5541ed;
  color: white;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.base};
  cursor: pointer;

  &.disabled {
    cursor: not-allowed;
    background-color: gray;
    color: white;
  }
`;

const ModalContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10000;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.57);
`;
