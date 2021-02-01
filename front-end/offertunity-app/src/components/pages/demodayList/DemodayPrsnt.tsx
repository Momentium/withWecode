import styled from "styled-components";
import { Link } from "react-router-dom";
import * as St from "components/styles/styledComp";
import LikeBtn from "components/common/button/iconBtn/LikeBtn";
import ShareBtn from "components/common/button/iconBtn/ShareBtn";

const DemodayPrsnt: React.FC<any> = ({ data, tags }) => {
  return (
    <StPjtWrap>
      <Link to={`/project/detail/${data.id}`}>
        <StImgWrap imgUrl={data.img} />
      </Link>

      <StContentsCont>
        <div className="up-wrap">
          <StNameCont className="name" to={`/project/detail/${data.id}`}>
            {data.name}
          </StNameCont>
        </div>
        <div className="mid-wrap">
          <p>{data.explain}</p>
        </div>
      </StContentsCont>

      <Link to={`/project/detail/${data.id}`}>
        <StInfoCont>
          <div className="table">
            <div className="tableWrapper">
              <div className="title">주최</div>
              <div className="content">{data.host}</div>
            </div>
            <div className="tableWrapper">
              <div className="title">참가팀</div>
              <div className="content">{data.teams}</div>
            </div>
            <div className="tableWrapper">
              <div className="title">진행일</div>
              <div className="content">{data.progressDate}</div>
            </div>
            <div className="tableWrapper tagsWrapper">{tags}</div>
          </div>
        </StInfoCont>
      </Link>
    </StPjtWrap>
  );
};
export default DemodayPrsnt;

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
  height: 12.938rem;

  background-image: url(${(props) => props.imgUrl});
  background-size: cover;
`;

const StContentsCont = styled.div`
  width: 39.375em;
  margin: 0 32px;

  display: flex;
  flex-direction: column;
  justify-content: space-around;
  overflow:hidden;

  .up-wrap {
    width: 100%;
    margin-bottom: 16px;

    display: flex;
    justify-content: space-between;
    align-items: flex-start;

    font: normal normal bold 21px/32px Spoqa Han Sans Neo;
    }
  }

  .mid-wrap {
    font: normal normal normal 15px/20px Spoqa Han Sans Neo;

    p {
      padding-bottom: 30px;
      width: 100%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: normal;
      text-align: left;
      word-wrap: break-word;
      display: -webkit-box;
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
  width: 284px;
  height: 12.938rem;
  display: flex;
  justify-content: flex-start;
  padding-left: 32px;
  border-left: dotted 2px #cccccc;

  .title,
  .content {
    text-align: left;
    font-size: 18px/20px;
  }

  .title {
    width: 74px;
    white-space: nowrap;
    font-weight: bold;
  }

  .content {
    width: 8.813em;
  }

  .tagsContainer {
    display: flex;
    flex-wrap: wrap;
  }

  .table {
    display: flex;
    height: 100%;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-around;

    .tableWrapper {
      display: flex;
      align-items: center;
    }

    .tagsWrapper {
      flex-wrap: wrap;
    }
  }
`;
