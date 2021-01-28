import React, { useState, useEffect, useRef } from "react";
import { Route, withRouter, RouteComponentProps } from "react-router-dom";
import styled, { ThemeProvider } from "styled-components";
import Header from "./components/common/header/Header";
import Banner from "./components/common/banner/Banner";
import Main from "./components/pages/main/Main";
import ProjectPage from "./components/pages/project/ProjectPage";
import Newsletter from "./components/common/newsletter/Newsletter";
import Footer from "./components/common/footer/Footer";
import theme from "./components/styles/theme";
import Auth from "./components/pages/Auth/Auth";
import StartupList from "./components/pages/startupList/StartupList";
import StartupDetails from "./components/pages/startupDetails/StartupDetails";
import MypageStartup from "./components/pages/mypage/MypageStartup";

const App:React.FC<RouteComponentProps<any>> = ({ location }) => {
  const [headMargin, setHeadMargin] = useState<number | undefined>(0);
  const headerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    setHeadMargin(headerRef.current?.clientHeight);
  }, []);
    
  return (
    <ThemeProvider theme={{...theme, ...location}}>
      
        {/* Header 들어갈 자리 */}
        <Header ref={headerRef}/>
        <StAppCont headMargin={headMargin}>
          { !location.pathname.includes("auth") && <Banner /> }

          {/* Route 들어갈 자리 */}
          <Route exact path="/" component={Main} />
          <Route path="/project" component={ProjectPage} />
          <Route path="/startup" component={StartupList} />
          <Route path="/auth/:name" component={Auth} />
          <Route path="/details" component={StartupDetails} />
        </StAppCont>

         {/* Footer 들어갈 자리 */}
        { !location.pathname.includes("auth") &&
          <>
            <Newsletter />
            <Footer />
          </>
        }
        
    </ThemeProvider>
  );
};
export default withRouter(App);

const StAppCont = styled.div<{headMargin: number | undefined}>`
  margin-top: ${props => `${props.headMargin}px`};
`;
