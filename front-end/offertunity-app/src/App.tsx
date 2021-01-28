import React, { useState, useEffect } from "react";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Header from "./components/common/header/Header";
import Banner from "./components/common/banner/Banner";
import Main from "./components/pages/main/Main";
import ProjectPage from "./components/pages/project/ProjectPage";
import Newsletter from "./components/common/newsletter/Newsletter";
import Footer from "./components/common/footer/Footer";
import theme from "./components/styles/theme";
import Auth from "./components/pages/Auth/Auth"
import StartupList from "./components/pages/startupList/StartupList";


const App:React.FC<RouteComponentProps<any>> = ({ location }) => {
  const [HH, setHH] = useState<number | undefined>(60);
  // useEffect(() => {
    // console.log(location.pathname)
  // }, []);

  const [curPage, setCurPage] = useState<string>("");
  useEffect(() => {
    setCurPage(location.pathname);
  }, [location])

    
  return (
    <ThemeProvider theme={theme}>
      
        {/* Header 들어갈 자리 */}
        <Header />
        {
         !curPage.includes("auth")  &&
          <>
            <Banner />
          </>
        }
        <StAppCont headerHeight={HH}>
          {/* Route 들어갈 자리 */}
          <Route exact path="/" component={Main} />
          <Route path="/project" component={ProjectPage} />
          <Route path="/list" component={StartupList} />
          <Route path="/auth/:name" component={Auth} />
        </StAppCont>
         {/* Footer 들어갈 자리 */}
        {
           !curPage.includes("auth")  &&
          <>
            <Newsletter />
            <Footer />
          </>
        }
        
    </ThemeProvider>
  );
};

export default withRouter(App);

const StAppCont = styled.div<{ headerHeight: number | undefined }>`
  /* margin-top: ${(props) => `${props.headerHeight}px`}; */
  margin-top: 7.5em;
`;
