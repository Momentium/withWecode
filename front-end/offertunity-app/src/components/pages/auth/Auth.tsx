import React from "react";
import { Route, Switch } from "react-router-dom";
import SignIn from "./signIn/SignIn";
import FindId from "./signIn/FindId";
import FindIdResult from "./signIn/FindIdResult";
import FindIdAgain from "./signIn/FindIdAgain";
import FindPw from "./signIn/FindPw";
import SignUp from "./signUp/SignUp";
import SignupSelectmember from "./signUp/SignupSelectmember";
import SignupFormStartup from "./signUp/SignupFormStartup";
import SignupFormPartner from "./signUp/SignupFormPartner";
import SignupFinishStartup from "./signUp/SignupFinishStartup";
import SignupFinishPartner from "./signUp/SignupFinishPartner";

const Auth = () => {
  return (
    <Switch>
      <Route path="/auth/SignIn" component={SignIn} />
      <Route path="/auth/FindId" component={FindId} />
      <Route path="/auth/FindPw" component={FindPw} />
      <Route path="/auth/FindIdResult" component={FindIdResult} />
      <Route path="/auth/FindIdAgain" component={FindIdAgain} />

      <Route path="/auth/SignUp" component={SignUp} />
      <Route path="/auth/SignupSelectmember" component={SignupSelectmember} />
      <Route path="/auth/SignupFormStartup" component={SignupFormStartup} />
      <Route path="/auth/SignupFormPartner" component={SignupFormPartner} />
      <Route path="/auth/SignupFinishStartup" component={SignupFinishStartup} />
      <Route path="/auth/SignupFinishPartner" component={SignupFinishPartner} />
    </Switch>
  );
};

export default Auth;
