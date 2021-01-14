import React from 'react';
import styled from 'styled-components';
import ProgressingProject from './ProgressingProject';
import NewProject from './NewProject';



const ProjectSection = () => {
  return(
  <Project >

    <Progress>
      <Title>진행 중인 지원사업</Title>
      <ProgressingProject  />
    </Progress>

    <New>
      <Title>새로운 지원사업</Title>
      <NewProject />
    </New>
    
  </Project>
  )
};

export default ProjectSection;

const Project = styled.section`
  ${({ theme }) => theme.ConWidth}
  margin-top:7.5rem;
  display: flex;
  justify-content: space-between;
`

const Title =styled.p`
  font-size:1.75rem;
  font-weight:bold;
`;

const Progress = styled.div`
  display: inline-block;
`;

const New =styled.div`
display: inline-block
`;