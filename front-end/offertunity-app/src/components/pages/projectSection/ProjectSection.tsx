import React from "react";
import styled from "styled-components";
import ProgressingProject from "./ProgressingProject";
import NewProject from "./NewProject";
// import MoreProject from "./MoreProject";
import MoreBtn from 'components/common/button/iconBtn/MoreBtn';

const ProjectSection = () => {
  return (
    <ProjectCon>
      <Project>
        <Progress>
          <Title>
            진행 중인 지원사업
            <MoreBtn txt={'더보기'} toLink={'/project'}/>
          </Title>
          <ProgressingProject />
        </Progress>

        <New>
          <Title>
            새로운 지원사업
            <MoreBtn txt={'더보기'} toLink={'/project'}/>
          </Title>
          <NewProject />
        </New>
      </Project>
      <img src="/images/coronabanner.png" alt="코로나 19 맟춤형 지원사업" />
    </ProjectCon>
  );
};

export default ProjectSection;

const ProjectCon = styled.section`
  ${({ theme }) => theme.conWidth}/* padding: 4rem 0; */
`;

const Project = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 11rem;
`;

const Title = styled.div`
  display: flex;
  justify-content: space-between;
  padding-bottom: 2.18rem;
  font-size: 1.68rem;
  font-weight: bold;
`;

const Progress = styled.div`
  width: 69%;
  padding-right: 2.4rem;
  display: inline-block;
  border-right: 1px solid #ccc;
`;

const New = styled.div`
  padding-left: 1.25rem;
  display: inline-block;
  width: 30%;
`;
