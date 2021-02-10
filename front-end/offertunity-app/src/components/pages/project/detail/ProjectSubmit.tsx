import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InputForm from "./InputForm";
import TitleWithMsg from "./TitleWithMsg";
import ViewInfo from "../../workstation/startup/applyPjt/ViewInfo";
import Modal from "./Modal";
const ProjectSubmit: React.FC<any> = ({
  selectFile,
  handleUploadFile,
  bizDescription,
  setBizDescription,
  bizModel,
  setBizModel,
  btn,
}) => {
  const uploadList = [
    {
      title: "사업계획서",
      id: "plane",
    },
    {
      title: "사업자등록 사본",
      id: "bizLicense",
    },
    {
      title: "대표자 주민등록증 (운전면허증)",
      id: "idCard",
    },
    {
      title: "자격 보유 현황 (지적재산권 포함)",
      id: "license",
    },
  ];
  const [modal, setModal] = useState<boolean>(false);
  // 모달 창에서 수정하고 저장했을때 담기는 state
  const [modalData, setModalData] = useState();

  const handleModal = () => {
    setModal(!modal);
  };

  // 모달 창에서 저장을 했을때 저장되는 함수
  const addProfile = (data: any) => {
    setModalData(data);
  };

  useEffect(() => {
    console.log(bizDescription);
  }, [bizDescription]);

  const changeVal = (e: any) => {
    const _target = e.currentTarget;
    switch (_target.className.split(" ")[2]) {
      case "bizDescription":
        setBizDescription(_target.value);
        _target.value.length > 1000 &&
          setBizDescription(_target.value.substring(0, 1000));
        break;
      case "bizModel":
        setBizModel(_target.value);
        _target.value.length > 1000 &&
          setBizModel(_target.value.substring(0, 1000));
        break;
    }
  };

  return (
    <ProjectSubmitCont>
      <ViewInfo handleModal={handleModal} />
      <PjSummary>
        <TitleWithMsg title={"비즈니스 개요"} msg={"비즈 개요입니다"} />
        <TextArea
          onChange={changeVal}
          value={bizDescription}
          className={"bizDescription"}
          placeholder="텍스트를 작성해주세요"
        />
        <CurrText>{`${
          bizDescription ? bizDescription.length : 0
        } / 1000자`}</CurrText>
      </PjSummary>
      <PjBizModel>
        <TitleWithMsg title={"비즈니스 모델"} msg={"비즈 모델입니다"} />
        <TextArea
          onChange={changeVal}
          value={bizModel}
          className={"bizModel"}
          placeholder="텍스트를 작성해주세요"
        />
        <CurrText>{`${bizModel ? bizModel.length : 0} / 1000자`}</CurrText>
      </PjBizModel>
      <PjSubmitDocu>
        <TitleWithMsg
          title={"제출 서류"}
          msg={"제출 서류는 우측의 등록하기 버튼을 이용해주세요."}
        />
        <form onSubmit={handleUploadFile}>
          {uploadList.map((item, idx) => {
            return (
              <FileUplaodCont>
                <FileUplaodBox key={idx}>
                  <span title="sub_title">{item.title}</span>
                  {selectFile && (
                    <span title="selected_title">{selectFile}</span>
                  )}
                  <FileBox className={`inputFile ${item}`}>등록</FileBox>
                </FileUplaodBox>
                {/* {fileVisible && <SelectFile />} */}
              </FileUplaodCont>
            );
          })}
        </form>
      </PjSubmitDocu>
      {modal && (
        <ModalContainer>
          <Modal handleModal={handleModal} addProfile={addProfile} />
        </ModalContainer>
      )}
      <ButtonCont>{btn}</ButtonCont>
    </ProjectSubmitCont>
  );
};

export default ProjectSubmit;

const ProjectSubmitCont = styled.div`
  position: relative;
  ${({ theme }) => theme.flexColumn}
  width: 100%;
  margin-top: 7.5rem;
`;

const PjSummary = styled.div`
  ${({ theme }) => theme.flexColumn}
  margin-bottom: 3rem;
`;

const PjBizModel = styled.div`
  ${({ theme }) => theme.flexColumn}
  margin-bottom: 3rem;
`;

const PjSubmitDocu = styled.div`
  ${({ theme }) => theme.flexColumn}
`;

const FileUplaodCont = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
  height: 5.5rem;
  margin-bottom: 1rem;
  margin-top: 20px;
  padding: 0 2.5rem;
  background-color: #fbfaff;
`;

const FileUplaodBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  span {
    font-size: 1.313rem;
    font-weight: bold;
  }
`;

const FileBox = styled.div`
  display: inline-block;
  width: 2.438rem;
  height: 1.563rem;
  border-radius: 1.5rem;
  text-align: center;
  font-size: 0.8em;
  font-weight: 700;
  color: white;
  background-color: #c3bdf4;
  cursor: pointer;
`;

const TextArea = styled.textarea`
  height: 19.5rem;
  border: 1px solid #d4d1d8;
  padding: 1.5rem;
  resize: none;

  /* &:focus {
    outline: none !important;
  } */
`;

const CurrText = styled.p`
  margin-top: 1rem;
  font-size: 1.125rem;
  text-align: right;
  color: #5b5b5b;
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

const ButtonCont = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;
