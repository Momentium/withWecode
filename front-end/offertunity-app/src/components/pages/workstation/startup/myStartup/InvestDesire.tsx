import styled from 'styled-components';
import * as St from 'styles/styledComp';
import SelectBtn from '../../SelectBtn';

const InvestDesire:React.FC<any> = () => {
  return (
    <StCont>
      <St.SectionTitle>희망 투자 정보</St.SectionTitle>

      <StDesireCont>
        <StDesireWrap>
          <div className="cate">현재 투자 단계</div>
          <div className="val">엔젤투자</div>
        </StDesireWrap>
        <StDesireWrap>
          <div className="cate">희망 투자 단계</div>
          <div className="val">시드투자, 프리A시리즈</div>
        </StDesireWrap>
        <StDesireWrap>
          <div className="cate">희망 투자 유지 금액</div>
          <div className="val">1천만원 ~ 5천만원</div>
        </StDesireWrap>
      </StDesireCont>

      <StDesireCont>
        <StDesireWrap>
          <div className="cate">현재 투자 단계</div>
          <SelectBtn mode={"invest"} width={186} curVal={"엔젤투자"} changeVal={() => {}}/>
        </StDesireWrap>
        <StDesireWrap>
          <div className="cate">희망 투자 단계</div>
          <SelectBtn mode={"invest"} width={186} curVal={"엔젤투자"} changeVal={() => {}}/>
        </StDesireWrap>
        <StDesireWrap>
          <div className="cate">희망 투자 유지 금액</div>
          <SelectBtn mode={"investCost"} width={208} curVal={"1천만원 - 5천만원"} changeVal={() => {}}/>
        </StDesireWrap>
      </StDesireCont>

      <div className="btn-cont">
        <StBtn>추가하기</StBtn>
      </div>
      
    </StCont>
  );
};
export default InvestDesire;

const StCont = styled.div`
  margin: 120px 0;

  .btn-cont {
    width: 100%;
    display: flex;
    justify-content: center;
  }
`;

const StDesireCont = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 24px;
  margin-bottom: 48px;
`;

const StDesireWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  width: 408px;
  height: 140px;
  border: 1px solid #D8D8D8;
  border-radius: 6px;

  .cate {
    font-size: 21px;
    font-weight: bold;
  }
  .val {
    font-size: 18px;
  }
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
