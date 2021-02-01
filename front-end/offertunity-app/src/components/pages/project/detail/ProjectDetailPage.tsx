import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import * as St from "components/styles/styledComp";
import MoveBar from "../../../common/detail/MoveBar";
import ProjectCard from "./ProjectCard";
import ProjectDetailInfo from "./ProjectDetailInfo";
import ProjectSubmit from "./ProjectSubmit";
import StButton from "./StButton";

const ProjectDetailPage: React.FC<any> = ({ match }) => {
  const [data, setData] = useState<any>({});
  const [like, setLike] = useState<boolean>(data.like);
  const [checkFile, setCheckFile] = useState<any | null>();

  useEffect(() => {
    axios.get("/data/projectData/overview.json").then((res) => {
      const _resData = res.data[match.params.id];
      setData(_resData);
    });
  }, []);

  console.log(data);

  const clickLike = (e: React.MouseEvent<HTMLDivElement>) => {
    setLike(!like);
  };

  const onUploadFile = React.useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (e.currentTarget.files != null) {
        const file = e.currentTarget.files[0];
        console.log(file);
      }
    },
    []
  );

  const handleUploadFile = (e: React.FormEventHandler<HTMLFormElement>) => {
    // e.preventDefault();
    console.log("hello");
  };

  return (
    <ProjectDetailPageCont>
      <MoveBar data={data} />
      <ProjectCard data={data} like={like} clickLike={clickLike} />
      {/* <ProjectDetailInfo data={data} /> */}
      <ProjectSubmit
        onUploadFile={onUploadFile}
        handleUploadFile={handleUploadFile}
      />
      <ProjectRequestBtn>
        <StButton />
      </ProjectRequestBtn>
    </ProjectDetailPageCont>
  );
};

export default ProjectDetailPage;

const ProjectDetailPageCont = styled(St.Section)`
  display: flex;
  flex-direction: column;
`;

const ProjectRequestBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 121px;
`;
