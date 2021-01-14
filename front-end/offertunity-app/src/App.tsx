import React, { useState, useEffect } from "react";
import { BrowserRouter, Route } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Header from "./components/pages/header/Header";
import Banner from "./components/pages/banner/Banner"
import Main from "./components/pages/main/Main";
import ProjectPage from "./components/pages/project/ProjectPage";
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
          <Route exact path='/' component={Main} />
          <Route path='/project' component={ProjectPage} />
        </StAppCont>

        {/* Footer 들어갈 자리 */}
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default App;

const StAppCont = styled.div<{ headerHeight: number | undefined }>`
  margin-top: ${(props) => `${props.headerHeight}px`};
`;
