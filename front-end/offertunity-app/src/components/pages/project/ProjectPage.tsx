import styled from 'styled-components';
import * as St from '../../styles/styledComp';
import ProjectList from './ProjectList';
import SelectBtn from 'components/common/button/SelectBtn';

const ProjectPage = () => {
  return (
    <>
      <St.Section>
        <StCont className="upper-cont">
          <St.SectionTitle>진행중인 지원사업</St.SectionTitle>
          {/* <StTitleWrap>진행중인 지원사업</StTitleWrap> */}
          <StCont className="filter-cont">
            <SelectBtn curPage={"project"} category={"date"}/>
            <SelectBtn curPage={"project"} category={"support"}/>
            <SelectBtn curPage={"project"} category={"establish"}/>
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

// const StPjtPageCont = styled.div`
//   ${({ theme }) => theme.ConWidth}
// `;

// const StTitleWrap = styled.h1`
//   margin-bottom: 1.25rem;
//   font-weight: bold;
//   font-size: ${({ theme }) => theme.fontSizes.titleSize};
// `;