import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Header from "./components/common/header/Header";
import Banner from "./components/common/banner/Banner"
import Main from "./components/pages/main/Main";
import ProjectPage from "./components/pages/project/ProjectPage";
import SignUp from "./components/pages/signUp/SignUp"
import Newsletter from "./components/common/newsletter/Newsletter";
import Footer from "./components/common/footer/Footer";
import theme from "./components/styles/theme";

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
  margin-top: ${(props) => `${props.headerHeight}px`};
`;
