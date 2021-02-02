import styled, {css} from 'styled-components';
import * as St from 'components/styles/styledComp';
import SelectBtn from '../../SelectBtn';

const InvestHist = () => {
  return (
    <StCont>
      <St.SectionTitle>희망 투자 정보</St.SectionTitle>
      
      <StHistCont>
        <StHistWrap>
          <div className="log">투자 유치 이력</div>
          <div className="table-cont">
            <div></div>
            <StInvestWrap>시드 투자</StInvestWrap>
          </div>
        </StHistWrap>
        <div className="line"/>
        <StHistWrap>
          <div className="log">투자 유치 이력</div>
          <div className="table-cont">
            <div></div>
            <StInvestWrap>시드 투자</StInvestWrap>
          </div>
        </StHistWrap>
      </StHistCont>

      <div className="btn-cont">
        <StBtn>추가하기</StBtn>
      </div>
    </StCont>
  );
}
export default InvestHist;

const StCont = styled.div`
  margin: 120px 0;

  .btn-cont {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const StHistCont = styled.div`  
  
  background: white;
  
  padding: 0 72px;

  margin-top: 24px;
  margin-bottom: 48px;

  border: 1px solid #CDCDCD;
  border-radius: 6px;

  .line {
    width: 100%;
    height: 1px;
    background: #C4C4C4;
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

  .table-cont {
    width: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
`;

const StInvestWrap = styled.span`
  display: inline-block;
  width: 300px;
  line-height: 56px;
  background: white;
  border: 1px solid #5142E4;
  border-radius: 5px;

  color: #5541ED;
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
  border: 1px solid #5541EE;
  border-radius: 5px;

  margin-top: 24px;

  color: #5541EE;
  font-size: 18px;
  font-weight: bold;

  text-align: center;
  vertical-align: middle;
`;

