import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "./components/styles/theme";

import SignIn from "./components/pages/Auth/signIn/SignIn"
import FindId from "./components/pages/Auth/signIn/FindId"
import FindIdResult from "./components/pages/Auth/signIn/FindIdResult"
import FindIdAgain from "./components/pages/Auth/signIn/FindIdAgain"
import FindPw from "./components/pages/Auth/signIn/FindPw"

import SignUp from "./components/pages/Auth/signUp/SignUp"
import SignupSelectmember from "./components/pages/Auth/signUp/SignupSelectmember"
import SignupFormStartup from "./components/pages/Auth/signUp/SignupFormStartup"
import SignupFormPartner from "./components/pages/Auth/signUp/SignupFormPartner"
import SignupFinishStartup from "./components/pages/Auth/signUp/SignupFinishStartup"
import SignupFinishPartner from "./components/pages/Auth/signUp/SignupFinishPartner"


const AuthRoutes = () => {
  
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Switch >
          <Route path="/SignIn" component={SignIn} />
          <Route path="/FindId" component={FindId} />
          <Route path="/FindPw" component={FindPw}/>
          <Route path="/FindIdResult" component={FindIdResult} />
          <Route path="/FindIdAgain" component={FindIdAgain} />

          <Route path="/signUp" component={SignUp} />
          <Route path="/SignupSelectmember" component={SignupSelectmember} />
          <Route path="/SignupFormStartup" component={SignupFormStartup} />
          <Route path="/SignupFormPartner" component={SignupFormPartner} />
          <Route path="/SignupFinishStartup" component={SignupFinishStartup} />
          <Route path="/SignupFinishPartner" component={SignupFinishPartner} />
        </Switch>
      </BrowserRouter>
    </ThemeProvider>
  );
};

export default AuthRoutes;

