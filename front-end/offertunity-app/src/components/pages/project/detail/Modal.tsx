import React, { useState, useEffect } from "react";
import styled from "styled-components";
import EditInfo from "../../workstation/startup/applyPjt/EditInfo";
import DocCardList from '../../workstation/startup/adminDoc/DocCardList';

const Modal = ({ mode, handleModal, data }: any) => {
  const [curScroll, setCurScroll] = useState<number>(window.scrollY);
  const noScroll = () => {
    window.scrollTo(0, curScroll);
  };
  useEffect(() => {
    window.addEventListener("scroll", noScroll);
    return () => window.removeEventListener("scroll", noScroll);
  }, []);

  const _mode = {
    '사업계획서': 'plan',
    '사업자등록증': 'etc',
    '대표자 주민등록증(운전면허증)': 'etc',
  }

  return (
    <ModalContainer>
      <ModalCont>
        { mode === 'editInfo' && <EditInfo handleModal={handleModal} /> }
        { mode === 'checkDoc' && 
          <>
            <DocCardList mode={(_mode as any)[data]} label={data} selectable={true}/>
            <StBtnCont>
              <StBtn onClick={() => {}}>저장</StBtn>
              <StBtn onClick={() => {handleModal("close")}}>취소</StBtn>
            </StBtnCont>
          </> 
        }
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
  overflow: auto;
  width: 80vw;
  height: 80vh;
  padding: 30px 50px 0px 50px;
  background-color: #ffffff;
`;

const StBtnCont = styled.div`
  display: flex;
  justify-content: flex-end;

  margin-top: 24px;
  div:last-child {
    margin-left: 16px;
  }
`;
const StBtn = styled.div`
  cursor: pointer;
  width: 160px;
  height: 56px;
  display: flex;
  justify-content: center;
  align-items: center;
  
  background: white;
  color: #5541ED;
  border: 1px solid #5541ED;
  border-radius: 5px;

  transition: all 0.1s linear;

  :hover {
    background: #5541ED;
    color: white;
  }
`;
