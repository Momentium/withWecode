import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import * as St from "styles/styledComp";
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
  });
  const [like, setLike] = useState<boolean>(data.like);
  const [user, setUser] = useState<boolean>(false);

  useEffect(() => {
    const _resId = match.params.id;
    axios
      .get(`http://10.0.1.29:3000/projects/${_resId}`)
      .then((res) => {
        const _data = res.data.projectDetail;
        if (Object.keys(_data).length === 0) {
          alert("정보가 아직 등록 되어있지 않습니다.");
        } else {
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
            },
          });
        }
      })
      .then(() => {
        console.log(data);
      });
  }, []);

  const changeDetail = () => {
    const getUserInfo = sessionStorage.getItem("userInfo");
    const userInfo = JSON.parse(String(getUserInfo));

    if (userInfo?.type_id === 1) {
      setUser(true);
    }
  };

  const clickLike = (e: React.MouseEvent<HTMLDivElement>) => {
    setLike(!like);
  };

  return (
    <>
      <ProjectDetailPageCont>
        <MoveBar data={data} />
        <ProjectCard
          data={data}
          like={like}
          clickLike={clickLike}
          changeDetail={changeDetail}
        />
        {user ? <ProjectSubmit /> : <ProjectDetailInfo data={data} />}
      </ProjectDetailPageCont>
      <ProjectRequestBtn>
        <StButton changeDetail={changeDetail} />
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
