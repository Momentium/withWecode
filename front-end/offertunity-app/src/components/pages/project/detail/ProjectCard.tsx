import React, { useState, useEffect } from "react";
import axios from "axios";
import styled from "styled-components";
import * as St from "components/styles/styledComp";
import LikeBtn from "components/common/button/iconBtn/LikeBtn";
import ShareBtn from "components/common/button/iconBtn/ShareBtn";
import StButton from "./StButton";

const ProjectCard: React.FC<any> = ({ data, like, clickLike }) => {
  const { tag } = data;
  return (
    <StOverviewCont>
      <img src={`${data.img}`} alt="project-img" />
      <StRightCont>
        <div className="name">{data.name}</div>
        <div className="explain">{data.explain}</div>
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
                <td>{data.target}</td>
              </tr>
              <tr>
                <th>마감일</th>
                <td>{data.deadline}</td>
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
          <StButton />
          <LikeBtn isLike={like} clickLike={clickLike} />
          <ShareBtn />
        </StBtnsCont>
      </StRightCont>
    </StOverviewCont>
  );
};

export default ProjectCard;

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
