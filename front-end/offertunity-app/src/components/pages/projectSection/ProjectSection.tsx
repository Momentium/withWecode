import React from 'react';
import styled from 'styled-components';
import ProgressingProject from './ProgressingProject';
import NewProject from './NewProject';
import MoreProject from './MoreProject'



const ProjectSection = () => {
  return(
  <Project >

    <Progress>
      <Title>
        진행 중인 지원사업
        <MoreProject />
      </Title>
      <ProgressingProject  />
    </Progress>

    <New>
      <Title>
        새로운 지원사업
        <MoreProject />
      </Title>
      <NewProject />
    </New>
    
  </Project>
  )
};

export default ProjectSection;

const Project = styled.section`
  ${({ theme }) => theme.ConWidth}
  display: flex;
  justify-content: space-between;
  padding:8rem 0;
`

const Title =styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom:2.18rem;
  font-size: 1.68rem;
  font-weight:bold;
`;

const Progress = styled.div`
  width:69%;
  padding-right:2.4rem;
  display: inline-block;
  border-right:1px solid #ccc;
`;

const New =styled.div`
padding-left:1.25rem;
display: inline-block;;
width:30%;
`;