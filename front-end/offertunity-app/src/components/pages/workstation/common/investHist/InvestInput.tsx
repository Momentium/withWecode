import styled, { css } from "styled-components";
import SelectBtn from "../SelectBtn";
import InputBox from "../InputBox";
import BasicBtn from "components/common/button/BasicBtn";

const InvestInput: React.FC<any> = ({ view, value, changeVal, addInvest }) => {
  const {
    investedDates,
    investedStartups,
    investedInstitutions,
    investedFunds,
    investedValues,
    investedSeries,
  } = value;

  return (
    <StInputCont>
      <div className="table-cont">
        <StTable>
          <tbody>
            <tr>
              <th>투자 일자</th>
              <td>
                <InputBox
                  cName="invest_day"
                  type="text"
                  placeholder="예시) 2020.01"
                  width={265}
                  height={44}
                  fSize={18}
                  fWeight={"normal"}
                  value={investedDates}
                  changeVal={changeVal}
                />
              </td>
              <th>{view === "startup" ? "투자 기관" : "스타트업"}</th>
              <td>
                <InputBox
                  cName="invest_depart"
                  type="text"
                  placeholder={`예시) ${
                    view === "startup"
                      ? "오퍼인베스트먼트"
                      : "이상한 나라의 엘리스"
                  }`}
                  width={265}
                  height={44}
                  fSize={18}
                  fWeight={"normal"}
                  value={
                    view === "startup" ? investedInstitutions : investedStartups
                  }
                  changeVal={changeVal}
                />
              </td>
            </tr>
            <tr className="margin-tr"></tr>
            <tr>
              <th>투자 금액</th>
              <td>
                <SelectBtn
                  cName="invest-cost"
                  mode={"investCost"}
                  width={208}
                  curVal={investedFunds}
                  changeVal={changeVal}
                />
              </td>

              <th>기업 가치</th>
              <td>
                <InputBox
                  cName="company_value"
                  type="text"
                  placeholder="숫자만 입력해주세요."
                  width={265}
                  height={44}
                  fSize={18}
                  fWeight={"normal"}
                  value={investedValues}
                  changeVal={changeVal}
                />
              </td>
            </tr>
          </tbody>
        </StTable>
        <SelectBtn
          cName="invest-series"
          mode={"invest"}
          width={260}
          curVal={investedSeries}
          changeVal={changeVal}
        />
      </div>

      <div className="btn-cont">
        <BasicBtn
          width={243}
          height={56}
          fSize={18}
          fWeight={"normal"}
          txt={"등록하기"}
          click={addInvest}
        />
      </div>
    </StInputCont>
  );
};
export default InvestInput;

const StInputCont = styled.div`
  display: flex;
  flex-direction: column;

  width: 100%;
  border: 1px solid #cdcdcd;
  border-radius: 6px;
  margin-top: 24px;

  padding: 56px 72px;

  .btn-cont {
    width: 100%;
    display: flex;
    justify-content: flex-end;
    margin-top: 14px;
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
