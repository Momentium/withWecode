import styled from 'styled-components';
import * as St from '../../../styles/styledComp';
import ProjectList from './ProjectList';
import SelectBtn from 'components/common/button/selectBtn/SelectBtn';

const ProjectPage = () => {
  return (
    <>
      <St.Section>
        <StCont className="upper-cont">
          <St.SectionTitle>진행중인 지원사업</St.SectionTitle>
          <StCont className="filter-cont">
            {/* <SelectBtn curPage={"project"} category={"date"}/>
            <SelectBtn curPage={"project"} category={"support"}/>
            <SelectBtn curPage={"project"} category={"establish"}/> */}
          </StCont>
        </StCont>
      </St.Section>

      <ProjectList/>
    </>
  );
};
export default ProjectPage;

const StCont = styled(St.FlexDiv)`
  justify-content: space-between;

  &.upper-cont{
    margin-bottom: 48px;
  }
`;