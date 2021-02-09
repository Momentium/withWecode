import styled from "styled-components";
import * as St from "styles/styledComp";
import CheckBtn from "components/common/button/CheckBtn";

const CheckDoc: React.FC<any> = ({ checkDoc, changeVal }) => {
  return (
    <StCont>
      <St.SectionTitle>제출서류</St.SectionTitle>
      <div className="check-cont">
        <CheckBtn
          _id={"biz-plan"}
          label={"사업계획서"}
          checked={checkDoc.includes("사업계획서")}
          click={changeVal}
        />
        <CheckBtn
          _id={"license-copy"}
          label={"사업자등록 사본"}
          checked={checkDoc.includes("사업자등록 사본")}
          click={changeVal}
        />
        <CheckBtn
          _id={"id-card"}
          label={"대표자 주민등록증 (운전면허증)"}
          checked={checkDoc.includes("대표자 주민등록증 (운전면허증)")}
          click={changeVal}
        />
      </div>
    </StCont>
  );
};
export default CheckDoc;

const StCont = styled.div`

  margin-bottom: 80px;

  .check-cont {
    width: 100%;
    margin-top: 48px;

    div:nth-child(3n) {
      margin-bottom: 0px;
    }
  }
`;
