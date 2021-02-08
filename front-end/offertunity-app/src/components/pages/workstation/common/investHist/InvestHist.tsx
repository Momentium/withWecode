import styled from "styled-components";
import { Close } from "@material-ui/icons";

const InvestHist: React.FC<any> = ({ view, data, removeInvest }) => {
  return (
    <>
      <StHistWrap>
        <div className="log">투자 {view === "startup" && "유치"} 이력</div>
        <div className={`close-btn ${data.idx} ${data.temp}`} onClick={removeInvest}><Close/></div>
        <div className="table-cont">
          <StTable>
            <tbody>
              <tr>
                <th>투자 일자</th>
                <td>{data.investedDates}</td>
                {view === "startup" ? (
                  <>
                    <th>투자 기관</th>
                    <td>{data.investedInstitutions}</td>
                  </>
                ) : (
                  <>
                    <th>스타트업</th>
                    <td>{data.investedStartups}</td>
                  </>
                )}
              </tr>
              <tr className="margin-tr">
                <th>&nbsp;</th>
              </tr>
              <tr>
                <th>투자 금액</th>
                <td>{data.investedFunds}</td>
                <th>기업 가치</th>
                <td>{data.investedValues} 원</td>
              </tr>
            </tbody>
          </StTable>
          <StInvestWrap>{data.investedSeries}</StInvestWrap>
        </div>
      </StHistWrap>
      <div className="line" />
    </>
  );
};
export default InvestHist;

const StHistWrap = styled.div`
  width: 100%;
  padding: 48px 0;

  position: relative;
  
  .close-btn {
    cursor: pointer;
    display: flex;
    position: absolute;
    top: 8px;
    right: 8px;
  }

  .log {
    font-size: 21px;
    font-weight: bold;
    margin-bottom: 24px;
  }
`;

const StTable = styled.table`
  font-size: 18px;
  tr.margin-tr {
    height: 16px;
  }
  th {
    color: #444444;
    font-weight: bold;
    padding-right: 16px;
  }
  td {
    box-sizing: border-box;
    width: 272px;
    padding-right: 32px;
  }
`;

const StInvestWrap = styled.span`
  display: inline-block;
  width: 300px;
  line-height: 56px;
  background: white;
  border: 1px solid #5142e4;
  border-radius: 5px;

  color: #5541ed;
  font-size: 18px;

  text-align: center;
  vertical-align: middle;
`;
