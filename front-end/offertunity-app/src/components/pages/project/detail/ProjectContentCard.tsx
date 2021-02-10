import React from "react";
import styled from "styled-components";
import * as St from "styles/styledComp";
import LikeBtn from "../../../common/detail/buttons/LikeBtn";
import ShareBtn from "components/common/button/iconBtn/ShareBtn";

const ProjectContentCard = ({ data, like, clickLike, changeBtn, btn }: any) => {
  return (
    <StOverviewCont>
      <img
        src={
          data.project_images ? data.project_images : "/images/header/logo.png"
        }
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
                <td>{data.eligible_sectors}</td>
              </tr>
              <tr>
                <th>지원대상</th>
                <td>{data.eligibilities}</td>
              </tr>
              <tr>
                <th>마감일</th>
                <td>{data.due_date.slice(0, 10)}</td>
              </tr>
            </tbody>
          </StInfoTable>
          <StInfoTag>
            <div className="bot-wrap">
              {data.tag &&
                data.tag.map((el: string, idx: number) => {
                  return <St.Tag key={idx}>{el}</St.Tag>;
                })}
            </div>
          </StInfoTag>
        </StInfoCont>
        <StBtnsCont>
          {btn}
          <LikeBtn isLike={like} clickLike={clickLike} />
          <ShareBtn />
        </StBtnsCont>
      </StRightCont>
    </StOverviewCont>
  );
};
export default ProjectContentCard;

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
