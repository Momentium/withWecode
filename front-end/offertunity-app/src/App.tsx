import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import styled from 'styled-components';
import Main from './pages/main/Main';
import FooterC from './common/footer/FooterC';

const App = () => {
  const [HH, setHH] = useState<number|undefined>(0);
  useEffect(() => {

  }, []);

  return (
    <BrowserRouter>
      {/* Header 들어갈 자리 */}

      <StAppCont headerHeight={HH}>
      {/* Route 들어갈 자리 */} 
        <Route exact path="/" component={Main} />
      </StAppCont>
      
      {/* Footer 들어갈 자리 */}
      <FooterC/>
      
    </BrowserRouter>
  );
}

export default App;

const StAppCont = styled.div<{headerHeight:number|undefined}>`
  margin-top: ${props => `${props.headerHeight}px`};
`;