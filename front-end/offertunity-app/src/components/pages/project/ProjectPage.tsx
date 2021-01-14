import styled from 'styled-components';
import ProjectList from './ProjectList';
import SelectBtn from '../../common/button/SelectBtn';

const ProjectPage = () => {
  return (
    <StPjtPageCont>
      <StUpperCont>
        <StTitleWrap>진행중인 지원사업</StTitleWrap>
        <StFilter>
          <SelectBtn curPage={"project"} category={"date"}/>
          <SelectBtn curPage={"project"} category={"support"}/>
          <SelectBtn curPage={"project"} category={"establish"}/>
        </StFilter>
      </StUpperCont>

      <ProjectList/>
    </StPjtPageCont>
  );
};
export default ProjectPage;

const StPjtPageCont = styled.div`
  ${({ theme }) => theme.ConWidth}
`;

const StTitleWrap = styled.h1`
  margin-bottom: 1.25rem;
  font-weight: bold;
  font-size: ${({ theme }) => theme.fontSizes.titleSize};
`;

const StUpperCont = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StFilter = styled(StUpperCont)``;
