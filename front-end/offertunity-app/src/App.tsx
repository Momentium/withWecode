import React, { useState, useEffect } from "react";
import {
  BrowserRouter,
  Route,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
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
import Auth from "./components/pages/Auth/Auth";

const App: React.FC<RouteComponentProps<any>> = ({ location }) => {
  const [HH, setHH] = useState<number | undefined>(60);
  useEffect(() => {
    console.log(location.pathname);
  }, []);

  const Reject = location.pathname.includes("/Auth");

  return (
    <ThemeProvider theme={theme}>
      {/* Header 들어갈 자리 */}
      {!Reject && (
        <>
          <Header />
          <Banner />
        </>
      )}
      <Route path="/Auth/:name" component={Auth} />
      <StAppCont headerHeight={HH}>
        {/* Route 들어갈 자리 */}
        <Route exact path="/" component={Main} />
        <Route path="/project" component={ProjectPage} />
        <Route path="/details" component={StartupDetails} />

        {/* Footer 들어갈 자리 */}
        <Newsletter />
        <Footer />
        <Route path="/list" component={StartupList} />
      </StAppCont>
      {/* Footer 들어갈 자리 */}
      {!Reject && (
        <>
          <Newsletter />
          <Footer />
        </>
      )}
    </ThemeProvider>
  );
};

export default withRouter(App);

const StAppCont = styled.div<{ headerHeight: number | undefined }>`
  /* margin-top: ${(props) => `${props.headerHeight}px`}; */
  margin-top: 7.5em;
`;
