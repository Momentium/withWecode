import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Banner from "./components/common/banner/Banner.tsx";
const Routes = () => {
  <Router>
    <Nav />
    <ThemeProvider theme={theme}>
      <Switch>
        <BrowserRouter></BrowserRouter>
      </Switch>
    </ThemeProvider>
  </Router>;
};

export default Routes;
