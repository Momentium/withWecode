import styled, { css } from "styled-components";
import * as St from "styles/styledComp";
import SelectBtn from "../../SelectBtn";
import InputBox from "../../InputBox";

const InvestHist = () => {
  return (
    <StCont>
      <St.SectionTitle>투자 유지 이력</St.SectionTitle>

      <StHistCont>
        {/* <StHistWrap>
          <div className="log">투자 유치 이력</div>
          <div className="table-cont">
            <StTable>
              <tbody>
                <tr>
                  <th>투자 일자</th>
                  <td>2020.12</td>
                  <th>투자 기관</th>
                  <td>헬로우 투자기관</td>
                </tr>
                <tr className="margin-tr"><th>&nbsp;</th></tr>
                <tr>
                  <th>투자 금액</th>
                  <td>1,000,000,000 원</td>
                  <th>기업 가치</th>
                  <td>10,000,000,000 원</td>
                </tr>
              </tbody>
            </StTable>
            <StInvestWrap>시드 투자</StInvestWrap>
          </div>
        </StHistWrap>
        <div className="line" />
        <StHistWrap>
          <div className="log">투자 유치 이력</div>
          <div className="table-cont">
            <StTable>
              <tbody>
                <tr>
                  <th>투자 일자</th>
                  <td>2020.12</td>
                  <th>투자 기관</th>
                  <td>헬로우 투자기관</td>
                </tr>
                <tr className="margin-tr"><th>&nbsp;</th></tr>
                <tr>
                  <th>투자 금액</th>
                  <td>1,000,000,000 원</td>
                  <th>기업 가치</th>
                  <td>10,000,000,000 원</td>
                </tr>
              </tbody>
            </StTable>
            <StInvestWrap>시드 투자</StInvestWrap>
          </div>
        </StHistWrap>
        <div className="line" /> */}
      </StHistCont>

      <div className="btn-cont">
        <StBtn>추가하기</StBtn>
      </div>

      <StInputCont>
        <div className="table-cont">
          <StTable>
            <tbody>
              <tr>
                <th>투자 일자</th>
                <td><InputBox 
                  cName="invest_day"
                  type="text" 
                  placeholder="예시) 2020.01"

                  width={265}
                  height={44}
                  fSize={18}
                  fWeight={'normal'}

                  value={""}
                  changeVal={() => {}}
                /></td>
                <th>투자 기관</th>
                <td><InputBox 
                  cName="invest_depart"
                  type="text" 
                  placeholder="예시) 오퍼인베스트먼트"

                  width={265}
                  height={44}
                  fSize={18}
                  fWeight={'normal'}

                  value={""}
                  changeVal={() => {}}
                /></td>
              </tr>
              <tr className="margin-tr"></tr>
              <tr>
                <th>투자 금액</th>
                <td><SelectBtn mode={"investCost"} width={208} curVal={"1천만원 - 5천만원"} changeVal={() => {}}/></td>

                <th>기업 가치</th>
                <td><InputBox 
                  cName="company_value"
                  type="text" 
                  placeholder="숫자만 입력해주세요."

                  width={265}
                  height={44}
                  fSize={18}
                  fWeight={'normal'}

                  value={""}
                  changeVal={() => {}}
                /></td>
              </tr>
            </tbody>
          </StTable>
          <SelectBtn mode={"invest"} width={260} curVal={"엔젤투자"} changeVal={() => {}}/>
        </div>
      </StInputCont>
    </StCont>
  );
};
export default InvestHist;

const StCont = styled.div`
  margin-bottom: 120px;

  .btn-cont {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .table-cont {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
  }
`;

const StHistCont = styled.div`
  background: white;

  padding: 0 72px;
  margin-top: 24px;
  border: 1px solid #cdcdcd;
  border-radius: 6px;

  .line {
    width: 100%;
    height: 1px;
    background: #c4c4c4;
    &:last-child {
      display: none;
    }
  }
`;

const StHistWrap = styled.div`
  width: 100%;
  padding: 48px 0;

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

const StBtn = styled.span`
  cursor: pointer;
  display: inline-block;
  width: 275px;
  line-height: 56px;
  background: white;
  border: 1px solid #5541ee;
  border-radius: 5px;
  margin: 48px 0 54px 0;

  color: #5541ee;
  font-size: 18px;
  font-weight: bold;

  text-align: center;
  vertical-align: middle;
`;

const StInputCont = styled.div`
  width: 100%;
  border: 1px solid #cdcdcd;
  border-radius: 6px;

  padding: 22px 72px;
`;

