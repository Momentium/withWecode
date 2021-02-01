import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';
import * as St from 'components/styles/styledComp';
import Project from './Project';
import ProjectDetail from './ProjectDetail';

const ProjectDetailPage:React.FC<any> = ({ match }) => {
  const [ovData, setOVData] = useState<any>({});
  const [dtData, setDtData] = useState<any>({});

  useEffect(() => {
    const _sessionData = JSON.parse(String(sessionStorage.getItem('pjt_overview_data')));
    setOVData(_sessionData);
    axios.get('/data/projectData/detail.json')
    .then((res) => {
      const _resData = res.data[0];
      setDtData(_resData);
    })
  },[])

  return (
    <StPjtDetailCont>
      <StRootWrap>{`홈  >  지원사업  >  ${ovData.name}`}</StRootWrap>
      <Project data={ovData} page={"detail"}/>
      <ProjectDetail data={dtData}/>
    </StPjtDetailCont>
  );
}

export default ProjectDetailPage;

const StPjtDetailCont = styled(St.Section)`
  display: flex;
  flex-direction: column;
`;

const StRootWrap = styled.div`
  margin-top: 40px;
  margin-bottom: 64px;
`;
