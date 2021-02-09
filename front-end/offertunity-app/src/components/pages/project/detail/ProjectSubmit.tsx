import React, { useEffect, useState } from "react";
import styled from "styled-components";
import InputForm from "./InputForm";
import TitleWithMsg from "./TitleWithMsg";

const ProjectSubmit: React.FC<any> = ({
  handleUploadFile,
  bizDescription,
  setBizDescription,
  bizModel,
  setBizModel,
  selectFile,
  setSelectFile,
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

  const changeVal = (e: any) => {
    const _target = e.currentTarget;
    switch (_target.className.split(" ")[2]) {
      case "bizDescription":
        _target.value.length < 1000 && setBizDescription(_target.value);
        break;
      case "bizModel":
        _target.value.length < 1000 && setBizModel(_target.value);
        break;
    }
  };

  return (
    <ProjectSubmitCont>
      <PjSummary>
        <TitleWithMsg title={"비즈니스 개요"} msg={"비즈 개요입니다"} />
        <InputForm
          className={"bizDescription"}
          changeVal={changeVal}
          txt={bizDescription}
        />
      </PjSummary>
      <PjBizModel>
        <TitleWithMsg title={"비즈니스 모델"} msg={"비즈 모델입니다"} />
        <InputForm
          className={"bizModel"}
          changeVal={changeVal}
          txt={bizModel}
        />
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
    </ProjectSubmitCont>
  );
};

export default ProjectSubmit;

const ProjectSubmitCont = styled.div`
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
