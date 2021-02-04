import styled from "styled-components";
import * as St from "components/styles/styledComp";

const IntroForm:React.FC<any>= ({ cName, title, txt, changeVal }) => {
  return (
    <div>
      <St.SectionTitle>{title}</St.SectionTitle>
      <StTxtarea 
        className={cName}
        placeholder={`${title}를 작성해주세요.`}
        value={txt}
        onChange={changeVal}
      />
    </div>
  );
}
export default IntroForm;

const StTxtarea = styled.textarea`
  width: 100%;
  min-height: 480px;
  padding: 24px;
  margin-top: 24px;
  margin-bottom: 80px;

  font-size: 18px;

  &::placeholder {
    color: #898989;
  }
`;