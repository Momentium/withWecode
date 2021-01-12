import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import Main from './pages/main/Main';

const App = () => {
  return (
    <BrowserRouter>
      {/* Header 들어갈 자리 */}

      {/* Route 들어갈 자리 */} 
      <Route exact path="/" component={Main} />

      {/* Footer 들어갈 자리 */}
    </BrowserRouter>
  );
}

export default App;