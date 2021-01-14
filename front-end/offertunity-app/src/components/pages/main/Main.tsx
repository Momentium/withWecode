import React, { useState, useEffect } from "react";
import styled from "styled-components";
import Banner from "../banner/Banner";
import Selection from "../selection/Selection";
import Newsletter from "../newsletter/Newsletter";
import Footer from "../footer/Footer";

const Main = () => {
  return (
    <>
      <StMainCont>
        <div className="banner-cont">
          <Banner />
        </div>
        <div className="projects-cont">
          <div className="progress"></div>
          <div className="new"></div>
        </div>
        <div className="projects-banner"></div>
        <div className="invest-cont"></div>
        <div className="startup-cont">
          <Selection />
        </div>
        <div className="newsletter-cont">
          <Newsletter />
        </div>
      </StMainCont>
      <Footer />
    </>
  );
};
export default Main;

const StMainCont = styled.div`
  height: 300vh;
`;
