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
  const [data, setData] = useState<any>({
    name: "",
    due_date: "0000-00-00",
    outline: "정보가 아직 없습니다.",
    detail: "정보가 아직 없습니다",
    created_at: "2020-02-04T06:17:00.837Z",
    deleted_at: "2021-02-04T06:17:00.837Z",
    project_images:
      "https://offertunity.s3.ap-northeast-2.amazonaws.com/profileimage/1612420170404.png",
  });
  const [like, setLike] = useState<boolean>(data.like);

  useEffect(() => {
    const _resId = match.params.id;
    axios
      .get(`http://10.0.1.29:3000/projects/${_resId}`)
      .then((res) => {
        const _data = res.data.projectDetail;
        if (Object.keys(_data).length === 0) {
          alert("정보가 아직 등록 되어있지 않습니다.");
        } else {
          console.log(_data.project_images.length);
          setData({
            ..._data,
            ...{
              name: _data.name,
              due_date: _data.due_date ? _data.due_date : "2020.10.10",
              outline: _data.outline ? _data.outline : "정보가 없다",
              detail: _data.detail ? _data.detail : "정보가 없다",
              created_at: _data.created_at
                ? _data.created_at
                : "2020-02-04T06:17:00.837Z",
              deleted_at: _data.deleted_at
                ? _data.deleted_at
                : "2021-02-04T06:17:00.837Z",
              project_images:
                _data.project_images.length !== 0
                  ? _data.project_images
                  : [
                      {
                        id: 1,
                        project_id: 1,
                        img_url:
                          "https://offertunity.s3.ap-northeast-2.amazonaws.com/profileimage/1612420170404.png",
                      },
                    ],
            },
          });
        }
      })
      .then(() => {
        console.log(data);
      });
  }, []);

  // console.log(data);

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
