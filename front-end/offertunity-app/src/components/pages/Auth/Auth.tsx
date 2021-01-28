import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { ThemeProvider } from "styled-components";
import theme from "../../styles/theme";

import SignIn from "./signIn/SignIn"
import FindId from "./signIn/FindId"
import FindIdResult from "./signIn/FindIdResult"
import FindIdAgain from "./signIn/FindIdAgain"
import FindPw from "./signIn/FindPw"

import SignUp from "./signUp/SignUp"
import SignupSelectmember from "./signUp/SignupSelectmember"
import SignupFormStartup from "./signUp/SignupFormStartup"
import SignupFormPartner from "./signUp/SignupFormPartner"
import SignupFinishStartup from "./signUp/SignupFinishStartup"
import SignupFinishPartner from "./signUp/SignupFinishPartner"





const Auth = () => {
  
  return (
    <Switch >
      <Route path="/Auth/SignIn" component={SignIn} />
      <Route path="/Auth/FindId" component={FindId} />
      <Route path="/Auth/FindPw" component={FindPw}/>
      <Route path="/Auth/FindIdResult" component={FindIdResult} />
      <Route path="/Auth/FindIdAgain" component={FindIdAgain} />

      <Route path="/Auth/SignUp" component={SignUp} />
      <Route path="/Auth/SignupSelectmember" component={SignupSelectmember} />
      <Route path="/Auth/SignupFormStartup" component={SignupFormStartup} />
      <Route path="/Auth/SignupFormPartner" component={SignupFormPartner} />
      <Route path="/Auth/SignupFinishStartup" component={SignupFinishStartup} />
      <Route path="/Auth/SignupFinishPartner" component={SignupFinishPartner} />
    </Switch>
  );
};

export default Auth;

