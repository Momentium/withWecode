import ProjectList from './ProjectList';
import styled from 'styled-components';

const ProjectPage = () => {
  return (
    <div>
      <StUpperCont>
        <div className="title">진행중인 지원사업</div>
        <StFilter>
          <div></div>
          <div></div>
          <div></div>
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