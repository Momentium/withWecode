import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import * as St from "styles/styledComp";
import * as Mt from "api/methods";
import MoveBar from "../../../common/detail/MoveBar";
import ProjectContent from "./ProjectContent";

import StButton from "./StButton";

const ProjectDetailPage: React.FC<any> = ({ match }: any) => {
  const getUserInfo = sessionStorage.getItem("userInfo");
  const userInfo = JSON.parse(String(getUserInfo))?.type_id;
  const _token = Mt.getUserInfo().token;

  const [isLogin, setIsLogin] = useState<boolean>();
  useEffect(() => {
    _token ? setIsLogin(true) : setIsLogin(false);
  }, []);

  // 데이터를 가져옴
  const [data, setData] = useState<any>({
    name: "",
    due_date: "0000-00-00",
    outline: "정보가 아직 없습니다.",
    detail: "정보가 아직 없습니다",
    created_at: "2020-02-04T06:17:00.837Z",
    deleted_at: "2021-02-04T06:17:00.837Z",
  });

  const [currApply, setCurrApply] = useState<any>();

  useEffect(() => {
    const _resId = match.params.id;
    let config = {};
    if (_token) {
      config = {
        Accept: "application/json",
        Authorization: `${_token}`,
      };
    }
    axios
      .get(`${process.env.REACT_APP_URL}/projects/${_resId}`, {
        headers: config,
      })
      .then((res) => {
        const _data = res.data.cleanedProject;
        const currApply = res.data.hasApplied;
        if (Object.keys(_data).length === 0) {
          alert("정보가 아직 등록 되어있지 않습니다.");
        } else {
          setData({
            ..._data,
            ...{
              name: _data.name,
              due_date: _data.due_date ? _data.due_date : "2021.00.00",
              outline: _data.outline
                ? _data.outline
                : "등록된 정보가 없습니다.",
              detail: _data.detail ? _data.detail : "등록된 정보가 없습니다.",
              created_at: _data.created_at
                ? _data.created_at
                : "2021-00-00T06:17:00.837Z",
              deleted_at: _data.deleted_at
                ? _data.deleted_at
                : "2021-00-00T06:17:00.837Z",
            },
          });
          setCurrApply(currApply);
        }
      });
  }, []);

  return (
    <ProjectDetailPageCont>
      <MoveBar data={data} />
      <ProjectContent
        data={data}
        userInfo={userInfo}
        setCurrApply={setCurrApply}
        currApply={currApply}
        isLogin={isLogin}
        token={_token}
      />
    </ProjectDetailPageCont>
  );
};

export default ProjectDetailPage;

const ProjectDetailPageCont = styled(St.Section)`
  display: flex;
  flex-direction: column;
`;
