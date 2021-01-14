import React, { useState, useEffect } from 'react';
import ProjectList from './ProjectList';
import styled from 'styled-components';
import { FlexDiv } from '../../styles/flexDiv';
import Select from '../../common/Select';

const ProjectPage:React.FC<any> = ({ location }) => {
  useEffect(() => {
    sessionStorage.setItem('curPage', location.pathname?.substring(1));
  }, []);
  

  return (
    <div>
      <StUpperCont>
        <div className="title">진행중인 지원사업</div>
        <StSelectCont>
          <Select curPage={location.pathname?.substring(1)} category={"date"}/>
          <Select curPage={location.pathname?.substring(1)} category={"support"}/>
          <Select curPage={location.pathname?.substring(1)} category={"establish"}/>
        </StSelectCont>
      </StUpperCont>

      <ProjectList/>
    </div>
  );
};
export default ProjectPage;

const StUpperCont = styled(FlexDiv)`
  justify-content: space-between;
`;

const StSelectCont = styled(StUpperCont)`
`;
