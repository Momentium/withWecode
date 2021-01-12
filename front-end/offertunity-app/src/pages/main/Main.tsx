import React, { useState, useEffect } from 'react';
import styled from 'styled-components';

const Main = () => {
  return (
    <StMainCont>
      <div className="banner-cont"></div>
      <div className="projects-cont">
        <div className="progress"></div>
        <div className="new"></div>
      </div>
      <div className="projects-banner"></div>
      <div className="invest-cont"></div>
      <div className="startup-cont"></div>
      <div className="newsletter-cont"></div>
    </StMainCont>
  )
}
export default Main;

const StMainCont = styled.div`
  
`;