import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import * as St from "components/styles/styledComp";
import MoveBar from "../../../common/detail/MoveBar";
import ProjectCard from "./ProjectCard";
import ProjectDetailInfo from "./ProjectDetailInfo";
import ProjectSubmit from "./ProjectSubmit";
import StButton from "./StButton";

const ProjectDetailPage: React.FC<any> = ({ match }: any) => {
  const [data, setData] = useState<any>({});
  const [like, setLike] = useState<boolean>(data.like);

  useEffect(() => {
    const _resId = match.params.id;
    axios.get(`${process.env.REACT_APP_URL}/projects/${_resId}`).then((res) => {
      console.log(res);
      const _data = res.data.projectDetail;
      setData(_data);
    });
  }, []);

  const clickLike = (e: React.MouseEvent<HTMLDivElement>) => {
    setLike(!like);
  };

  return (
    <>
      <ProjectDetailPageCont>
        <MoveBar data={data} />
        <ProjectCard data={data} like={like} clickLike={clickLike} />
        <ProjectDetailInfo data={data} />
      </ProjectDetailPageCont>
      <ProjectRequestBtn>
        <StButton />
      </ProjectRequestBtn>
    </>
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
  margin-top: 7.563rem;
`;
