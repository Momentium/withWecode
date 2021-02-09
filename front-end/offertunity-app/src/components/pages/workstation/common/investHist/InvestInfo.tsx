import styled from "styled-components";
import * as St from "styles/styledComp";
import InvestHist from './InvestHist';
import InvestInput from './InvestInput';

const InvestInfo:React.FC<any> = ({ view, data, value, changeVal, addInvest, removeInvest }) => {
  console.log()
  return (
    <StCont>
      <St.SectionTitle>투자 {view === "startup" ? "유치 이력" : "정보"}</St.SectionTitle>

      { data.length !== 0 &&
        <StHistCont>
          {
            data.map((el:{}, idx:number) => 
              <InvestHist key={idx}
                view={view}
                data={el}
                removeInvest={removeInvest}
              />
            )
          }
        </StHistCont>
      }

      <InvestInput view={view} value={value} changeVal={changeVal} addInvest={addInvest}/>

    </StCont>
  );
};
export default InvestInfo;

const StCont = styled.div`
  margin: 120px 0;

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
