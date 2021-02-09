import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import styled from "styled-components";
import * as St from "styles/styledComp";
import Buttons from "../../../common/detail/buttons/Buttons";
import StButton from "./StButton";
import ShareBtn from "components/common/button/iconBtn/ShareBtn";
import ProjectDetailInfo from "./ProjectDetailInfo";
import ProjectSubmit from "./ProjectSubmit";
import ProjectDetail from "../ProjectDetail";
import ProjectRequestList from "./ProjectRequestList";

const ProjectContent: React.FC<any> = ({
  data,
  userInfo,
  setCurrApply,
  currApply,
}) => {
  const { tag } = data;

  // 페이지 토글
  const [toggle, setToggle] = useState<Boolean>(true);
  // 현재 페이지
  const [currPage, setCurrPage] = useState<String>("article");
  // 변화되는 버튼 텍스트 값
  const [changeBtn, setChangeBtn] = useState<JSX.Element>();
  const [currJsx, setCurrJsx] = useState<JSX.Element>();

  // 지원 작성 목록
  const [bizDescription, setBizDescription] = useState<string>();
  const [bizModel, setBizModel] = useState<string>();
  const [selectFile, setSelectFile] = useState<string>();

  // 지원 했는지 안했는지 검증

  const changeDetail = () => {
    if (userInfo === 1) {
      if (toggle) {
        setCurrPage("article");
        setChangeBtn(
          <StButton
            changePage={changePage}
            text={"지원하기"}
            userType={userInfo}
          />
        );
        setCurrJsx(<ProjectDetailInfo data={data} changeBtn={changeBtn} />);
      } else {
        setCurrPage("request");
        setChangeBtn(
          <StButton
            changePage={changePage}
            text={"지원완료"}
            userType={userInfo}
          />
        );
        setCurrJsx(
          <ProjectSubmit
            data={data}
            handleUploadFile={handleUploadFile}
            changeBtn={changeBtn}
            bizDescription={bizDescription}
            setBizDescription={setBizDescription}
            bizModel={bizModel}
            setBizModel={setBizModel}
            selectFile={selectFile}
            setSelectFile={setSelectFile}
          />
        );
      }
    }

    if (userInfo === 2) {
      if (toggle) {
        setCurrPage("article");
        setChangeBtn(
          <StButton
            changePage={changePage}
            text={"지원자 보기"}
            userType={userInfo}
          />
        );
        setCurrJsx(<ProjectDetailInfo data={data} />);
      } else {
        setCurrPage("reqList");
        setChangeBtn(
          <StButton
            changePage={changePage}
            text={"공고보기"}
            userType={userInfo}
          />
        );
        setCurrJsx(<ProjectRequestList data={data} />);
      }
    }

    if (!userInfo) {
      setCurrPage("article");
      setChangeBtn(
        <StButton
          changePage={changePage}
          text={"지원하기"}
          userType={userInfo}
        />
      );
      setCurrJsx(<ProjectDetailInfo data={data} />);
    }
  };

  const changePage = (e: any) => {
    const text = e.currentTarget.textContent;

    e.preventDefault();

    if (text === "지원하기") {
      setToggle(!toggle);
    }

    if (text === "지원완료") {
      handleUploadFile(e);
    }

    if (text === "지원자 보기") {
      setToggle(!toggle);
    }
  };

  const handleUploadFile = (e: any) => {
    e.preventDefault();

    if (!currApply) {
      console.log(bizDescription);
      setCurrApply(!currApply);
      setToggle(!toggle);
    }
  };

  useEffect(() => {
    changeDetail();
  }, [toggle]);

  return (
    <>
      <StOverviewCont>
        <img
          src="https://images.unsplash.com/photo-1492551557933-34265f7af79e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
          alt="project-img"
        />
        <StRightCont>
          <div className="name">{data.name}</div>
          <div className="explain">{data.introduction}</div>
          <hr />
          <StInfoCont>
            <StInfoTable>
              <tbody>
                <tr>
                  <th>주최</th>
                  <td>{data.host}</td>
                </tr>
                <tr>
                  <th>지원분야</th>
                  <td>{data.field}</td>
                </tr>
                <tr>
                  <th>지원대상</th>
                  <td>{data.eligibility}</td>
                </tr>
                <tr>
                  <th>마감일</th>
                  <td>{data.due_date.slice(0, 10)}</td>
                </tr>
              </tbody>
            </StInfoTable>
            <StInfoTag>
              <div className="bot-wrap">
                {tag &&
                  tag.map((el: string, idx: number) => {
                    return <St.Tag key={idx}>{el}</St.Tag>;
                  })}
              </div>
            </StInfoTag>
          </StInfoCont>
          <StBtnsCont>
            {changeBtn}
            <ShareBtn />
          </StBtnsCont>
        </StRightCont>
      </StOverviewCont>
      {currJsx}
      <ProjectRequestBtn>{changeBtn}</ProjectRequestBtn>
    </>
  );
};

export default ProjectContent;

const StOverviewCont = styled.div`
  display: flex;
  justify-content: space-between;

  img {
    width: 42rem;
  }

  & > div {
    width: 35.5rem;
  }
`;

const StRightCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  .name {
    font-size: 1.75rem;
    font-weight: bold;
  }
  .explain {
    font-size: 1.125ren;
    margin: 1.5ren 0;
    line-height: 2rem;
  }

  hr {
    width: 100%;
    margin-bottom: 1.563rem;
  }
`;

const StInfoCont = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
`;

const StInfoTable = styled.table`
  th,
  td {
    text-align: left;
    font-size: 1.125rem/1.25rem;
  }

  th {
    white-space: nowrap;
    font-weight: bold;
    padding: 0.5rem 3.75rem 0.5rem 0;
  }

  td {
    width: 8.813em;
  }

  margin-bottom: 2.75rem;
`;

const StInfoTag = styled.div`
  display: flex;

  .bot-wrap {
    display: flex;
  }
`;

const StBtnsCont = styled.div`
  width: 70%;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ProjectRequestBtn = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 7.563rem;
`;
