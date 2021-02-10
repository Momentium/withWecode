import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import Buttons from "../../../common/detail/buttons/Buttons";
import StButton from "./StButton";
import BasicBtn from "components/common/button/BasicBtn";
import ProjectDetailInfo from "./ProjectDetailInfo";
import ProjectSubmit from "./ProjectSubmit";
import ProjectRequestList from "./ProjectRequestList";
import ProjectContentCard from "./ProjectContentCard";
import { withRouter } from "react-router-dom";

const ProjectContent: React.FC<any> = ({ data, isLogin, token, userInfo }) => {
  const [like, setLike] = useState<boolean>(data.hasLiked);

  const clickLike = (e: React.MouseEvent<HTMLDivElement>) => {
    e.preventDefault();
    if (isLogin) {
      axios
        .get(`${process.env.REACT_APP_URL}/likes/project/${data.id}`, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((res) => setLike(!like))
        .catch((error) => console.log(error));
    } else {
      alert("오퍼튜니티에 로그인 하신 후 이용해 주시기 바랍니다.");
    }
  };

  const handleStartupArticleBtn = () => {
    setCurrPage("submit");
    console.log("hi");
  };

  const handleStartupSubmitBtn = () => {
    console.log("bye");
  };

  const handlePartnerArticleBtn = () => {
    setCurrPage("article");
  };

  const handlePartnerReqBtn = () => {
    console.log("sdfsdf");
  };

  const [currPage, setCurrPage] = useState("article");

  const ctrlBtn = () => {
    if (userInfo === 1 && currPage === "article") {
      return (
        <BasicBtn
          width="300"
          height="56"
          backColor="#5541ED"
          fSize="18px"
          fWeight="bold"
          txt="지원하기"
          click={handleStartupArticleBtn}
        />
      );
    }

    if (userInfo === 1 && currPage === "submit") {
      return (
        <BasicBtn
          width="300"
          height="56"
          backColor="white"
          fSize="18px"
          fWeight="bold"
          txt="지원완료"
          click={handleStartupSubmitBtn}
        />
      );
    }

    if (userInfo === 2 && currPage === "article") {
      return (
        <BasicBtn
          width="300"
          height="56"
          backColor="white"
          fSize="18px"
          fWeight="bold"
          txt="지원자보기"
          click={handlePartnerArticleBtn}
        />
      );
    }

    if (userInfo === 2 && currPage === "reqList") {
      return (
        <BasicBtn
          width="300"
          height="56"
          backColor="white"
          fSize="18px"
          fWeight="bold"
          txt="공고보기"
          click={handlePartnerReqBtn}
        />
      );
    }
  };

  return (
    <>
      <ProjectContentCard
        data={data}
        like={like}
        clickLike={clickLike}
        btn={ctrlBtn()}
      />
      {userInfo === 1 && currPage === "article" && (
        <ProjectDetailInfo data={data} btn={ctrlBtn()} />
      )}
      {userInfo === 1 && currPage === "submit" && (
        <ProjectSubmit data={data} btn={ctrlBtn()} />
      )}
      {userInfo === 2 && currPage === "article" && (
        <ProjectDetailInfo data={data} btn={ctrlBtn()} />
      )}
      {userInfo === 2 && currPage === "reqList" && (
        <ProjectRequestList data={data} btn={ctrlBtn()} />
      )}
    </>
  );
};

export default ProjectContent;

const ProjectRequestBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 7.563rem;
`;
