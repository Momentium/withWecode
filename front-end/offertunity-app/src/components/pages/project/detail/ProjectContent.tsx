import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import BasicBtn from "components/common/button/BasicBtn";
import ProjectDetailInfo from "./ProjectDetailInfo";
import ProjectSubmit from "./ProjectSubmit";
import ProjectRequestList from "./ProjectRequestList";
import ProjectContentCard from "./ProjectContentCard";
import * as Mt from "api/methods";

const ProjectContent: React.FC<any> = ({ data, isLogin, token, userInfo }) => {
  const [like, setLike] = useState(data.hasLiked);
  const [currPage, setCurrPage] = useState("article");
  const [bizDescription, setBizDescription] = useState<string>("");
  const [bizModel, setBizModel] = useState<string>();

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
  };

  const _data = {
    businessBrief: bizDescription,
    businessModel: bizModel,
  };

  const handleStartupSubmitBtn = () => {
    if (data.hasApplied) {
      alert("이미 지원 완료가 되었습니다.");
    } else {
      axios
        .post(`${process.env.REACT_APP_URL}/applies/${data.id}`, _data, {
          headers: {
            Authorization: `${token}`,
          },
        })
        .then((res) => console.log(res));

      alert("지원이 완료되었습니다.");
    }
  };

  const handlePartnerArticleBtn = () => {
    setCurrPage("reqList");
  };

  const handlePartnerReqBtn = () => {
    setCurrPage("article");
  };

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

    if (!userInfo) {
      return (
        <BasicBtn
          width="300"
          height="56"
          backColor="gray"
          fSize="18px"
          fWeight="bold"
          txt="지원하기"
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
        <ProjectSubmit
          data={data}
          btn={ctrlBtn()}
          bizDescription={bizDescription}
          setBizDescription={setBizDescription}
          bizModel={bizModel}
          setBizModel={setBizModel}
          token={token}
        />
      )}
      {userInfo === 2 && currPage === "article" && (
        <ProjectDetailInfo data={data} btn={ctrlBtn()} />
      )}
      {userInfo === 2 && currPage === "reqList" && (
        <ProjectRequestList data={data} btn={ctrlBtn()} />
      )}
      {!userInfo && <ProjectDetailInfo data={data} btn={ctrlBtn()} />}
    </>
  );
};

export default ProjectContent;

const ProjectRequestBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 7.563rem;
`;
