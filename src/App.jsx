import { Route, Routes } from 'react-router-dom';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Details from './pages/Details';

const paddingTop = '140px';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4369b2',
    },
    secondary: {
      main: '#5788e4',
      dark: '#35548b',
    },
    background: {
      default: '#5788e4',
      paper: '#4369b2',
    },
    text: {
      primary: '#ffffff',
      secondary: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Lato", "Helvetica", "Arial", sans-serif',
  },
});

const Container = styled('div')({
  display: 'flex',
  flexDirection: 'column',
  backgroundColor: theme.palette.background.default,
  paddingTop,
  minHeight: `calc(100vh - ${paddingTop})`,
});

const App = () => (
  <ThemeProvider theme={theme}>
    <Container>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:countryName" element={<Details />} />
      </Routes>
    </Container>
  </ThemeProvider>
);

export default App;
