import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InputForm from "./InputForm";
import TitleWithMsg from "./TitleWithMsg";
import ViewInfo from "../../workstation/startup/applyPjt/ViewInfo";
import Modal from "./Modal";
import UploadModal from "./UploadModal";
import axios from "axios";

const ProjectSubmit: React.FC<any> = ({
  selectFile,
  handleUploadFile,
  bizDescription,
  setBizDescription,
  bizModel,
  setBizModel,
  btn,
  data,
  token,
}) => {
  // const uploadList = [
  //   {
  //     title: "사업계획서",
  //     id: "plane",
  //   },
  //   {
  //     title: "사업자등록 사본",
  //     id: "bizLicense",
  //   },
  //   {
  //     title: "대표자 주민등록증 (운전면허증)",
  //     id: "idCard",
  //   },
  //   {
  //     title: "자격 보유 현황 (지적재산권 포함)",
  //     id: "license",
  //   },
  // ];
  const [modal, setModal] = useState<boolean>(false);
  const [curModal, setCurModal] = useState<string>("");
  const [curDoc, setCurDoc] = useState<string>("");
  const [uploadModal, setUploadModal] = useState<boolean>(false);

  const handleModal = (_mode: string) => {
    switch (_mode) {
      case "editInfo":
        setCurModal("editInfo");
        break;
      case "checkDoc":
        setCurModal("checkDoc");
        break;
    }
    setModal(!modal);
  };

  // const handleFileUploadModal = () => {
  //   setUploadModal(!uploadModal);
  // };

  const [applyResult, setApplyResult] = useState({
    is_applied: false,
    id: "",
    businessBrief: "",
    businessModel: "",
  });
  useEffect(() => {
    axios
      // .get(`http://10.0.1.29:3000/applies/${data.id}`, {
      .get(`${process.env.REACT_APP_URL}/applies/${data.id}`, {
        headers: {
          Authorization: `${token}`,
        },
      })
      .then((res) => {
        // console.log(res.data.data)
        setApplyResult({
          ...applyResult,
          ...{
            is_applied: res.data.data.is_applied,
            id: res.data.data.id,
            businessBrief: res.data.data.businessBrief,
            businessModel: res.data.data.businessModel,
          },
        });
      });
  }, []);

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

  // useEffect(() => {
  //   console.log(applyResult);
  // }, [applyResult]);

  return (
    <>
      <ProjectSubmitCont>
        <ViewInfo
          handleModal={handleModal}
          modal={modal}
          applyResult={applyResult?.is_applied}
        />
        <PjSummary>
          <TitleWithMsg title={"비즈니스 개요"} msg={"비즈 개요입니다"} />
          {applyResult?.is_applied ? (
            <>
              <TextArea
                onChange={changeVal}
                value={applyResult.businessBrief}
                className={"bizDescription"}
                placeholder="텍스트를 작성해주세요"
                readOnly
              />
              <CurrText>{`${
                bizDescription ? bizDescription.length : 0
              } / 1000자`}</CurrText>
            </>
          ) : (
            <>
              <TextArea
                onChange={changeVal}
                value={bizDescription}
                className={"bizDescription"}
                placeholder="텍스트를 작성해주세요"
              />
              <CurrText>{`${
                bizDescription ? bizDescription.length : 0
              } / 1000자`}</CurrText>
            </>
          )}
        </PjSummary>
        <PjBizModel>
          <TitleWithMsg title={"비즈니스 모델"} msg={"비즈 모델입니다"} />
          {applyResult?.is_applied ? (
            <>
              <TextArea
                onChange={changeVal}
                value={applyResult?.businessModel}
                className={"bizModel"}
                placeholder="텍스트를 작성해주세요"
                readOnly
              />
              <CurrText>{`${
                bizModel ? bizModel.length : 0
              } / 1000자`}</CurrText>
            </>
          ) : (
            <>
              <TextArea
                onChange={changeVal}
                value={bizModel}
                className={"bizModel"}
                placeholder="텍스트를 작성해주세요"
              />
              <CurrText>{`${
                bizModel ? bizModel.length : 0
              } / 1000자`}</CurrText>
            </>
          )}
        </PjBizModel>
        <PjSubmitDocu>
          {data.required_documents.length !== 0 && (
            <>
              <TitleWithMsg
                title={"제출 서류"}
                msg={"제출 서류는 우측의 등록하기 버튼을 이용해주세요."}
              />
              <form onSubmit={handleUploadFile}>
                {data.required_documents.map((item: string, idx: number) => {
                  return (
                    <FileUplaodCont key={idx}>
                      <FileUplaodBox>
                        <span title="sub_title">{item}</span>
                        {selectFile && (
                          <span title="selected_title">{selectFile}</span>
                        )}
                        <FileBox
                          className={`inputFile ${item}`}
                          onClick={() => {
                            setCurDoc(item);
                            handleModal("checkDoc");
                          }}
                        >
                          <span>+등록</span>
                        </FileBox>
                      </FileUplaodBox>
                      {/* {fileVisible && <SelectFile />} */}
                    </FileUplaodCont>
                  );
                })}
              </form>
            </>
          )}
        </PjSubmitDocu>
        <ButtonCont>
          {btn}
          <PrevBtn>취소</PrevBtn>
        </ButtonCont>
      </ProjectSubmitCont>

      {modal && curModal === "editInfo" && (
        <Modal mode={curModal} handleModal={handleModal} />
      )}
      {modal && curModal === "checkDoc" && (
        <Modal mode={curModal} data={curDoc} handleModal={handleModal} />
      )}

      {/* {uploadModal && (
        <UploadModal handleFileUploadModal={handleFileUploadModal} />
      )} */}
    </>
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
    font-size: 1.1rem;
    font-weight: bold;
  }
`;

const FileBox = styled.div`
  width: 80px;
  height: 40px;
  border-radius: 1.5rem;
  font-size: 15px;
  font-weight: 700;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #c3bdf4;
  color: white;
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

const ButtonCont = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 50px;
`;

const PrevBtn = styled.button``;
