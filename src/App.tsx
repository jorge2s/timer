import { ThemeProvider } from 'styled-components'
import { BrowserRouter } from 'react-router-dom';
import { Router } from './Router';

import { GlobalStyle } from './theme/global';
import { defaultTheme } from './theme/default';
import { CyclesContextProvider } from './contexts/CyclesContext';

function App() {
  return (
    <ThemeProvider theme={defaultTheme}>
      <BrowserRouter>
        <CyclesContextProvider>
          <Router />
        </CyclesContextProvider>
      </BrowserRouter>
      <GlobalStyle />
    </ThemeProvider>
  )
}

export default App
