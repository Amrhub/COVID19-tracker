import { Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Navbar from './components/Navbar';

import Home from './pages/Home';
import Details from './pages/Details';

const theme = createTheme({
  palette: {
    primary: {
      main: '#ec4c8a',
      contrastText: '#fff',
    },
  },
});

const App = () => (
  <ThemeProvider theme={theme}>
    <Navbar />
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/details" element={<Details />} />
    </Routes>
  </ThemeProvider>
);

export default App;
