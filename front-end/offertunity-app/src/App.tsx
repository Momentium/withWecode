import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Header from "./components/common/header/Header";
import Banner from "./components/common/banner/Banner";
import Main from "./components/pages/main/Main";
import ProjectPage from "./components/pages/project/ProjectPage";
import Newsletter from "./components/common/newsletter/Newsletter";
import Footer from "./components/common/footer/Footer";
import theme from "./components/styles/theme";
import StartupList from "./components/pages/startupList/StartupList";
import StartupDetails from "./components/pages/startupDetails/StartupDetails";

const App = () => {
  const [HH, setHH] = useState<number | undefined>(60);
  useEffect(() => {}, []);
  const [navHidden, setNavHidden] = useState(true);
  const [visibleBanner, setVisibleBanner] = useState(true);

  useEffect(() => {
    window.location.pathname === "/details" && setVisibleBanner(false);
  });

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Header />
        {visibleBanner && <Banner />}
        <StAppCont headerHeight={HH}>
          {/* Route 들어갈 자리 */}
          <Route exact path="/" component={Main} />
          <Route path="/project" component={ProjectPage} />
          <Route path="/details" component={StartupDetails} />
        </StAppCont>
        {/* Footer 들어갈 자리 */}
        <Newsletter />
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

const StAppCont = styled.div<{ headerHeight: number | undefined }>`
  /* margin-top: ${(props) => `${props.headerHeight}px`}; */
  margin-top: 7.5em;
`;
