import ProjectList from './ProjectList';
import styled from 'styled-components';
import SelectBtn from '../../common/button/SelectBtn';

const ProjectPage = () => {
  return (
    <div>
      <StUpperCont>
        <div className="title">진행중인 지원사업</div>
        <StFilter>
          <SelectBtn curPage={"project"} category={"date"}/>
          <SelectBtn curPage={"project"} category={"support"}/>
          <SelectBtn curPage={"project"} category={"establish"}/>
        </StFilter>
      </StUpperCont>

      <ProjectList/>
    </div>
  );
};
export default ProjectPage;

const StUpperCont = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const StFilter = styled(StUpperCont)`
  
`;