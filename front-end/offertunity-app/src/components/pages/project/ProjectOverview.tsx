import { Link } from "react-router-dom";
import styled, { css } from "styled-components";
import * as St from "styles/styledComp";
import IconBtns from "./IconBtns";

const ProjectOverview: React.FC<any> = ({
  page,
  data,
  tags,
  like,
  clickLike,
}) => {
  return page === "list" ? (
    <StPjtWrap>
      <StImgWrap imgUrl={data.img} />

      <StContentsCont>
        <div className="up-wrap">
          <StNameCont className="name" to={`/project/detail/${data.id}`}>
            {data.name}
          </StNameCont>
          <IconBtns page={page} like={like} clickLike={clickLike} />
        </div>
        <div className="mid-wrap">
          <p>{data.explain}</p>
        </div>
        <div className="bot-wrap">{tags}</div>
      </StContentsCont>

      <StInfoCont>
        <TableFC page="list" data={data} />
      </StInfoCont>
    </StPjtWrap>
  ) : (
    <StOverviewCont>
      <img src={`${data.img}`} alt="project-img" />
      <StRightCont>
        <div className="name">{data.name}</div>
        <div className="explain">{data.explain}</div>

        <StTableCont>
          <TableFC page="detail" data={data} />
        </StTableCont>

        <StButtonCont>
          <StButtonWrap>지원하기</StButtonWrap>
          <IconBtns page={page} like={like} clickLike={clickLike} />
        </StButtonCont>
      </StRightCont>
    </StOverviewCont>
  );
};
export default ProjectOverview;

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
    word-break: keep-all;
  }

  .mid-wrap {
    font: normal normal normal 15px/20px Spoqa Han Sans Neo;

    display: flex;
    align-items: center;

    p {
      width: 100%;

      overflow: hidden;
      text-overflow: ellipsis;
      word-break: keep-all;

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
    /* display: flex; */
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

const TableFC: React.FC<any> = ({ page, data }) => {
  return (
    <StInfoTable page={page}>
      <tbody>
        <tr>
          <th className="first-th">주최</th>
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
  );
};

const StInfoTable = styled.table<{ page: string }>`
  th,
  td {
    text-align: left;
    font-size: 18px;
  }
  td {
    width: 8.813em;
  }

  th {
    white-space: nowrap;
    font-weight: bold;

    ${(props) =>
      props.page === "list"
        ? css`
            padding: 8px 32px 8px 0;
          `
        : css`
            color: #5b5b5b;
            padding: 12px 105px 12px 0;
            &.first-th {
              padding-top: 0;
            }
          `};
  }

  ${(props) =>
    props.page === "list" &&
    css`
      margin-bottom: 44px;
    `};
`;

const StOverviewCont = styled.div`
  display: flex;
  justify-content: space-between;

  img {
    width: 672px;
  }

  & > div {
    width: 568px;
  }
`;

const StRightCont = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;

  word-break: keep-all;

  .name {
    font-size: 28px;
    font-weight: bold;
  }
  .explain {
    font-size: 18px;
    margin: 24px 0;
  }
`;

const StTableCont = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  border-top: solid 1px #afafaf;
  padding-top: 23px;

  .tag-cont {
    div:last-child {
      margin-right: 0;
    }
  }
`;

const StButtonCont = styled.div`
  display: flex;
`;

const StButtonWrap = styled.span`
  cursor: pointer;
  display: inline-block;
  width: 300px;
  line-height: 56px;
  background: #5541ed;
  border-radius: 5px;

  color: white;
  font-weight: bold;
  font-size: 18px;

  text-align: center;
  vertical-align: middle;
`;
