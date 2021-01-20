import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Header from "./components/common/header/Header";
import Banner from "./components/common/banner/Banner"
import Main from "./components/pages/main/Main";
import ProjectPage from "./components/pages/project/ProjectPage";
import Newsletter from "./components/common/newsletter/Newsletter";
import Footer from "./components/common/footer/Footer";
import theme from "./components/styles/theme";

import SignUp from "./components/pages/Auth/signUp/SignUp"
import SignupSelectmember from "./components/pages/Auth/signUp/SignupSelectmember"
import SignupFormStartup from "./components/pages/Auth/signUp/SignupFormStartup"
import SignupFormPartner from "./components/pages/Auth/signUp/SignupFormPartner"
import SignIn from "./components/pages/Auth/signIn/SignIn"

const App = () => {
  const [HH, setHH] = useState<number | undefined>(60);
  useEffect(() => {}, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {/* Header 들어갈 자리 */}
        <Header />
        <Banner />
        <StAppCont headerHeight={HH}>
          {/* Route 들어갈 자리 */}
          <Route exact path="/" component={Main} />
          <Route path="/project" component={ProjectPage} />

          <Route path="/signUp" component={SignUp} />
          <Route path="/SignIn" component={SignIn} />
          <Route path="/SignupSelectmember" component={SignupSelectmember} />
          <Route path="/SignupFormStartup" component={SignupFormStartup} />
          <Route path="/SignupFormPartner" component={SignupFormPartner} />

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
