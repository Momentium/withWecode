import styled from "styled-components";
import * as St from "../../styles/styledComp";
import DemodayList from "./DemodayList";

const ProjectPage = () => {
  return (
    <>
      <St.Section>
        <StCont className="upper-cont">
          <St.SectionTitle>진행 중인 온라인 데모데이</St.SectionTitle>
        </StCont>
      </St.Section>

      <DemodayList />
    </>
  );
};
export default ProjectPage;

const StCont = styled(St.FlexDiv)`
  justify-content: space-between;

  &.upper-cont {
    margin-bottom: 48px;
  }
`;
