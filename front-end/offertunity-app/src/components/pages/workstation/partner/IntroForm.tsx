import styled from "styled-components";
import * as St from "styles/styledComp";

const IntroForm:React.FC<any>= ({ cName, title, txt, changeVal }) => {
  return (
    <StCont>
      <St.SectionTitle>{title}</St.SectionTitle>
      {cName === 'invest-partner' && <StGuideDiv>최대 500자까지 작성할 수 있습니다.</StGuideDiv>}
      <StTxtarea 
        className={cName}
        placeholder={`${title}를 작성해주세요.`}
        value={txt}
        onChange={changeVal}
      />
      {
        cName === "invest-partner" &&
        <div className="flex-div">
          <StLetCntDiv>{`${txt ? txt.length : 0} / 500 자`}</StLetCntDiv>
        </div>
      }
    </StCont>
  );
}
export default IntroForm;


const StCont = styled.div`
  margin-bottom: 48px;
  .flex-div {
    display: flex;
    justify-content: flex-end;
  }
`;

const StGuideDiv = styled.div`
  margin-top: 24px;
  font-size: 15px;
  color: #9F9F9F;
`;

const StTxtarea = styled.textarea`
  width: 100%;
  min-height: 480px;
  padding: 24px;
  margin-top: 24px;
  /* margin-bottom: 80px; */

  font-size: 18px;

  &::placeholder {
    color: #898989;
  }
`;


const StLetCntDiv = styled.div`
  font-size: 15px;
  color: #5B5B5B;

  margin-top: 16px;
`;


