import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { format } from 'date-fns';
import { styled } from '@mui/material/styles';
// import { NavLink } from 'react-router-dom';

const HeaderTypography = styled(Typography)(({ theme }) => ({
  flexGrow: 1,
  textAlign: 'center',
  fontSize: '1rem',
  [theme.breakpoints.up('sm')]: {
    fontSize: '1.5rem',
  },
}));

const WhiteIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
}));

const Navbar = () => (
  <AppBar>
    <Toolbar>
      <WhiteIconButton>
        <MenuIcon />
      </WhiteIconButton>
      <HeaderTypography variant="h6" color="inherit" noWrap>
        {format(new Date(), 'do MMMM yyyy')}
      </HeaderTypography>
      <WhiteIconButton>
        <SearchIcon />
      </WhiteIconButton>
    </Toolbar>
  </AppBar>
);

export default Navbar;
