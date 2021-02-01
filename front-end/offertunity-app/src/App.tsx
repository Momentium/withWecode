import React, { useState, useEffect, useRef } from "react";
import {
  Switch,
  Route,
  withRouter,
  RouteComponentProps,
} from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Header from "./components/common/header/Header";
import Banner from "./components/common/banner/Banner";
import Main from "./components/pages/main/Main";
import ProjectPage from "./components/pages/project/ProjectPage";
import ProjectDetail from "./components/pages/project/ProjectDetailPage";
import Newsletter from "./components/common/newsletter/Newsletter";
import Footer from "./components/common/footer/Footer";
import theme from "./components/styles/theme";
import Auth from "./components/pages/auth/Auth";
import StartupList from "./components/pages/startupList/StartupList";
import StartupDetails from "./components/pages/startupDetails/StartupDetails";
import MypageStartup from "./components/pages/mypage/MypageStartup";
import PartnerList from "components/pages/partnerList/PartnerList";
import PartnerDetails from "./components/pages/partnersDetails/PartnerDetails";

const App: React.FC<RouteComponentProps<any>> = ({ location }) => {
  const [headMargin, setHeadMargin] = useState<number | undefined>(0);
  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setHeadMargin(headerRef.current?.clientHeight);
  }, []);
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  return (
    <ThemeProvider theme={{ ...theme, ...location }}>
      {/* Header 들어갈 자리 */}
      <Header ref={headerRef} />
      <StAppCont className="app" headMargin={headMargin}>
        {!location.pathname.includes("auth") &&
          !location.pathname.includes("detail") && <Banner />}

        {/* Route 들어갈 자리 */}
        <Route exact path="/" component={Main} />
        <Switch>
          <Route path="/project/detail/:id" component={ProjectDetail} />
          <Route path="/project" component={ProjectPage} />
          <Route path="/startup" component={StartupList} />
          <Route path="/startup/detail/:id" component={StartupDetails} />
          <Route path="/partner" component={PartnerList} />
          <Route path="/partner/detail/:id" component={PartnerDetails} />
        </Switch>
        <Route path="/auth/:name" component={Auth} />
      </StAppCont>

      {/* Footer 들어갈 자리 */}
      {!location.pathname.includes("auth") && (
        <>
          <Newsletter />
          <Footer />
        </>
      )}
    </ThemeProvider>
  );
};
export default withRouter(App);

const StAppCont = styled.div<{ headMargin: number | undefined }>`
  margin-top: ${(props) => `${props.headMargin}px`};
`;
