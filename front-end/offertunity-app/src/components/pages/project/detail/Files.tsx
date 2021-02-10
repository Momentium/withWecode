import React from "react";
import styled from "styled-components";

const Files = () => {
  return (
    <FilesCont>
      <File>
        <div className="title">사업계획서</div>
        <div className="file"></div>
      </File>
      <File>
        <div className="title">기타 파일</div>
        <div className="file"></div>
      </File>
    </FilesCont>
  );
};

export default Files;

const FilesCont = styled.div`
  margin-top: 96px;
  display: flex;
  flex-direction: column;

  .title {
    margin-bottom: 40px;
    font-weight: bold;
    font-size: 28px;
  }
`;

const File = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 96px;
`;
