import styled from "styled-components";

const PjtList:React.FC<any> = ({  }) => {
  return (
    <StHoverCont className="hover-cont">
      <div className="title">지원사업 이름이 들어갑니다.</div>
      <div className="contents">
        이번서울창업허브 허브방송국에서 다양한 형태의 영상 촬영 지원 프로그램을
        통해 기업의 제품 영상 촬영, 사진 촬영 지원 콘텐츠 제작 등으로 스타트업
        매출 증대 및 기업의 인지도 상승 기여
      </div>
      <StInfoTable>
        <tbody>
          <tr>
            <th className="first-th">주최</th>
            <td>이름이 들어갑니다.</td>
          </tr>
          <tr>
            <th>지원분야</th>
            <td>2020.00.00</td>
          </tr>
          <tr>
            <th>지원대상</th>
            <td>공간지원</td>
          </tr>
          <tr>
            <th>마감일</th>
            <td>7년 미만 기업</td>
          </tr>
        </tbody>
      </StInfoTable>
      <div className="btn-cont">
        <StBtn>수정하기</StBtn>
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
  background: black;
  width: 600px;
  height: 400px;

  padding: 32px;

  transition: opacity 0.33s ease-in-out;
  opacity: 0;

  &:hover {
    opacity: 0.9;
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
