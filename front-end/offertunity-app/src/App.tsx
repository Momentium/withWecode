import React, { useState, useEffect } from 'react'
import { BrowserRouter, Route } from 'react-router-dom'
import styled, { ThemeProvider } from 'styled-components'
import Main from './pages/main/Main'
import Project from './pages/project/ProjectPage'
import theme from './Styles/theme'

const App = () => {
  const [HH, setHH] = useState<number | undefined>(0)
  useEffect(() => {}, [])

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        {/* Header 들어갈 자리 */}

        <StAppCont headerHeight={HH}>
          {/* Route 들어갈 자리 */}
          <Route exact path='/' component={Main} />
          <Route path='/project' component={Project} />
        </StAppCont>

        {/* Footer 들어갈 자리 */}
      </BrowserRouter>
    </ThemeProvider>
  )
}

export default App

const StAppCont = styled.div<{ headerHeight: number | undefined }>`
  margin-top: ${(props) => `${props.headerHeight}px`};
`
