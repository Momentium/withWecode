import React, { useState } from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import * as St from "styles/styledComp";
import LikeBtn from "components/common/button/iconBtn/LikeBtn";
import ShareBtn from "components/common/button/iconBtn/ShareBtn";
import axios from "axios";

const ProjectPrsnt: React.FC<any> = ({ data, token, isLogin }) => {
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
    console.log("click");
  };

  return (
    <StPjtWrap>
      <StImgWrap
        imgUrl={
          data.project_images ? data.project_images : "/images/header/logo.png"
        }
      />

      <StContentsCont>
        <div className="up-wrap">
          <StNameCont className="name" to={`/project/detail/${data.id}`}>
            {data.name}
          </StNameCont>
          <div className="iconBtn-cont">
            <LikeBtn isLike={like} clickLike={clickLike} />
            <ShareBtn />
          </div>
        </div>
        <div className="mid-wrap">
          <p>{data.introduction}</p>
        </div>
        <div className="bot-wrap">
          {data.tag &&
            data.tag.map((el: string, idx: number) => {
              return <St.Tag key={idx}>{el}</St.Tag>;
            })}
        </div>
      </StContentsCont>

      <StInfoCont>
        <StInfoTable>
          <tbody>
            <tr>
              <th>주최</th>
              <td>{data.host}</td>
            </tr>
            <tr>
              <th>지원분야</th>
              <td>{data.sector_id}</td>
            </tr>
            <tr>
              <th>지원대상</th>
              <td>{data.eligibility}</td>
            </tr>
            <tr>
              <th>마감일</th>
              <td>{data.deleted_at}</td>
            </tr>
          </tbody>
        </StInfoTable>
      </StInfoCont>
    </StPjtWrap>
  );
};
export default ProjectPrsnt;

const StPjtWrap = styled(St.FlexDiv)`
  justify-content: space-between;
  width: 100%;
  height: 12.938em;
  margin-bottom: 40px;

  & > div {
    height: 100%;
  }
`;

const StImgWrap = styled.div<{ imgUrl: string | undefined }>`
  width: 19.438em;

  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
`;

const StContentsCont = styled.div`
  width: 39.375em;
  margin: 0 32px;

  display: flex;
  flex-direction: column;
  justify-content: space-between;
  align-items: flex-start;

  .up-wrap {
    width: 100%;
    margin-bottom: 16px;

    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    font: normal normal bold 21px/32px Spoqa Han Sans Neo;

    .iconBtn-cont {
      flex: 3;

      display: flex;
      justify-content: flex-end;
      align-items: center;

      & > div {
        margin-left: 24px;
      }
    }
  }

  .mid-wrap {
    font: normal normal normal 15px/20px Spoqa Han Sans Neo;

    display: flex;
    align-items: center;

    p {
      width: 100%;

      overflow: hidden;
      text-overflow: ellipsis;

      white-space: normal;
      text-align: left;
      word-wrap: break-word;
      display: -webkit-box;
      -webkit-line-clamp: 4;
      -webkit-box-orient: vertical;
    }
  }

  .bot-wrap {
    margin-top: 32px;
    display: flex;
  }
`;

const StNameCont = styled(Link)`
  .name {
    flex: 7;

    word-break: keep-all;
  }
`;

const StInfoCont = styled(St.FlexDiv)`
  display: flex;
  justify-content: flex-start;

  padding-left: 32px;
  border-left: dotted 2px #cccccc;
`;

const StInfoTable = styled.table`
  th,
  td {
    text-align: left;
    font-size: 18px/20px;
  }

  th {
    white-space: nowrap;
    font-weight: bold;
    padding: 8px 32px 8px 0;
  }

  td {
    width: 8.813em;
  }
`;
