import { Link } from "react-router-dom";
import styled from "styled-components";

const PjtList:React.FC<any> = ({ data }) => {
  return (
    <StHoverCont className="hover-cont">
      <div className="title">{data.name}</div>
      <div className="contents">
        {data.introduction}
      </div>
      <StInfoTable>
        <tbody>
          <tr>
            <th className="first-th">주최</th>
            <td>{data.host}</td>
          </tr>
          <tr>
            <th>마감일</th>
            <td>{(new Date(data.due_date).toISOString().substring(0, 10))}</td>
          </tr>
          <tr>
            <th>지원분야</th>
            <td>{data.eligible_sectors}</td>
          </tr>
          <tr>
            <th>지원대상</th>
            <td>{data.eligibilities}</td>
          </tr>
        </tbody>
      </StInfoTable>
      <div className="btn-cont">
        <Link to={`/workstation/myproject/addPjt/${data.id}`}>
          <StBtn>수정하기</StBtn>
        </Link>
        <StBtn>삭제하기</StBtn>
        <StBtn>오픈신청</StBtn>
      </div>
    </StHoverCont>
  );
};
export default PjtList;

const StHoverCont = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 600px;
  height: 400px;

  padding: 32px;

  transition: all 0.33s ease-in-out;
  opacity: 0;
  background: rgba(0, 0, 0, 0);

  &:hover {
    opacity: 1;
    background: rgba(0, 0, 0, 0.9);
  }

  color: white;

  .title {
    font-size: 21px;
    font-weight: bold;
  }
  .contents {
    font-size: 15px;
    margin-top: 24px;
    margin-bottom: 16px;
  }
  .btn-cont {
    width: 100%;
    display: flex;
    justify-content: space-around;
  }
`;

const StInfoTable = styled.table`
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

    padding: 8px 32px 8px 0;
  }
  margin-bottom: 40px;
`;

const StBtn = styled.span`
  display: inline-block;
  width: 135px;
  line-height: 34px;

  text-align: center;
  vertical-align: middle;

  font-size: 15px;
  font-weight: bold;

  border: 1px solid #5541ee;
  border-radius: 5px;
  background: white;
  color: #5541ed;

  &:hover {
    border: 1px solid #5541ee;
    border-radius: 5px;
    background: #5541ed;
    color: white;
  }
`;

const selectData = {
  supportField: [
    "공간지원",
    "사업화",
    "콘텐츠",
    "기술지원"
  ],
  eligibility: [
    "업력 무관",
    "7년 미만",
    "3년 미만"
  ],
}