import React, { useState, useEffect } from "react";
import styled from "styled-components";
import ProjectSection from "../projectSection/ProjectSection";
import Selection from "../selection/Selection";

const Main = () => {
  return (
    <>
      <StMainCont>
        <div className="projects-cont">
          <ProjectSection />
          <div className="progress"></div>
          <div className="new"></div>
        </div>
        <div className="projects-banner"></div>
        <div className="invest-cont"></div>
        <div className="startup-cont">
          <Selection />
        </div>
        
      </StMainCont>
    </>
  );
};
export default Main;

const StMainCont = styled.div`
  color: black;
`;
