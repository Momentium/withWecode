import React from "react";
import styled from "styled-components";

const ProjectSubmit: React.FC<any> = ({ onUploadFile, handleUploadFile }) => {
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
  return (
    <ProjectSubmitCont>
      <PjSummary>
        <Title>사업개요</Title>
        <NoticeMsg>최대 1000자까지 작성할 수 있습니다.</NoticeMsg>
        <TextArea />
        <CurrText>245/1000자</CurrText>
      </PjSummary>
      <PjBizModel>
        <Title>비즈니스 모델</Title>
        <NoticeMsg>최대 1000자까지 작성할 수 있습니다.</NoticeMsg>
        <TextArea />
        <CurrText>245/1000자</CurrText>
      </PjBizModel>
      <PjSubmitDocu>
        <Title>제출 서류</Title>
        <NoticeMsg>제출 서류는 우측의 등록하기 버튼을 이용해주세요.</NoticeMsg>
        <form onSubmit={handleUploadFile}>
          {uploadList.map((item, idx) => {
            return (
              <FileUplaodBox key={idx}>
                <span title="sub_title">{item.title}</span>
                <FileBox>
                  <input
                    type="file"
                    name={item.id}
                    id="file"
                    className="inputfile"
                    onChange={onUploadFile}
                  />
                  <label htmlFor="file">+등록</label>
                </FileBox>
              </FileUplaodBox>
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

const TextArea = styled.textarea`
  height: 19.5rem;
  border: 1px solid #d4d1d8;
  padding: 1.5rem;
  resize: none;

  &:focus {
    outline: none !important;
  }
`;

const Title = styled.div`
  margin-bottom: 1.5rem;
  font-weight: bold;
  font-size: 1.75rem;
`;

const PjSummary = styled.div`
  ${({ theme }) => theme.flexColumn}
  margin-bottom: 3rem;
`;

const NoticeMsg = styled.span`
  margin-bottom: 1.5rem;
  font-size: 1.125rem;
  color: #9f9f9f;
`;

const CurrText = styled.p`
  margin-top: 1rem;
  font-size: 1.125rem;
  text-align: right;
  color: #5b5b5b;
`;

const PjBizModel = styled.div`
  ${({ theme }) => theme.flexColumn}
  margin-bottom: 3rem;
`;

const PjSubmitDocu = styled.div`
  ${({ theme }) => theme.flexColumn}
`;

const FileUplaodBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 5.5rem;
  margin-bottom: 1rem;
  padding: 0 2.5rem;
  background-color: #fbfaff;

  span {
    font-size: 1.313rem;
    font-weight: bold;
  }
`;

const FileBox = styled.div`
  .inputfile {
    width: 0.006rem;
    height: 0.006rem;
    opacity: 0;
    overflow: hidden;
    position: absolute;
    z-index: -1;
  }

  .inputfile + label {
    display: inline-block;
    padding: 0.625rem 1.063rem;
    border-radius: 1.5rem;
    font-size: 0.8em;
    font-weight: 700;
    color: white;
    background-color: #c3bdf4;
    cursor: pointer;
  }
`;
