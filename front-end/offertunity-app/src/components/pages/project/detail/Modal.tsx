import React, { useState, useEffect } from "react";
import styled from "styled-components";
import EditInfo from "../../workstation/startup/applyPjt/EditInfo";
import SelectDoc from "./SelectDoc";

const Modal = ({ mode, handleModal, data, checkedDoc, saveCheck }: any) => {
  const [curScroll] = useState<number>(window.scrollY);
  const noScroll = () => {
    window.scrollTo(0, curScroll);
  };
  useEffect(() => {
    window.addEventListener("scroll", noScroll);
    return () => window.removeEventListener("scroll", noScroll);
  }, []);

  const _mode = {
    사업계획서: "plan",
    "사업자등록 사본": "etc",
    "대표자 주민등록증(운전면허증)": "etc",
  };
  const [selectedFile, setSelectedFile] = useState<any>({});
  const selectedIdx = (_name: string, ) => {
    setSelectedFile(_name);
  };

  return (
    <ModalContainer>
      <ModalCont>
        <div>
          {mode === "editInfo" && <EditInfo handleModal={handleModal} />}
          {mode === "checkDoc" && (
            <>
              <SelectDoc
                mode={(_mode as any)[data]}
                label={data}
                checkedDoc={checkedDoc}
                selectedIdx={selectedIdx}
              />
              <StBtnCont>
                <StBtn
                  onClick={() => {
                    saveCheck(selectedFile);
                    handleModal("close");
                  }}
                >
                  저장
                </StBtn>
                <StBtn
                  onClick={() => {
                    handleModal("close");
                  }}
                >
                  취소
                </StBtn>
              </StBtnCont>
            </>
          )}
        </div>
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
  /* padding: 40px 80px 0px 80px; */
  background-color: #ffffff;

  display: flex;
  justify-content: center;
  align-items: center;
  & > div {
    width: 80%;
    height: 80%;
  }
`;

const StBtnCont = styled.div`
  display: flex;
  justify-content: flex-end;

  margin: 120px 0;
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
  color: #5541ed;
  border: 1px solid #5541ed;
  border-radius: 5px;

  transition: all 0.1s linear;

  :hover {
    background: #5541ed;
    color: white;
  }
`;
