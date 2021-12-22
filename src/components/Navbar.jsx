import Toolbar from '@mui/material/Toolbar';
import AppBar from '@mui/material/AppBar';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { format } from 'date-fns';
import { styled } from '@mui/material/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import MobileDatePicker from '@mui/lab/MobileDatePicker';

import { useEffect, useState } from 'react';
import { Box, TextField } from '@mui/material';
import { useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowBack } from '@mui/icons-material';
import { fetchReports } from '../redux/reports/reports';

const WhiteIconButton = styled(IconButton)(({ theme }) => ({
  color: theme.palette.common.white,
}));

const Navbar = () => {
  const dispatch = useDispatch();
  const location = useLocation();
  const navigate = useNavigate();
  const isDetailsPage = /^\/details\/.+/.test(location.pathname);

  const [searchDate, setSearchDate] = useState(format(new Date(), 'yyyy-MM-dd'));

  useEffect(() => {
    dispatch(fetchReports(searchDate));
  }, [searchDate]);

  const updateSearchDate = (date) => {
    setSearchDate(format(date, 'yyyy-MM-dd'));
    navigate('/');
  };

  return (
    <AppBar color="background">
      <Toolbar>
        {isDetailsPage ? (
          <WhiteIconButton onClick={() => navigate('/')}>
            <ArrowBack />
          </WhiteIconButton>
        ) : null}
        <Box
          sx={{
            flexGrow: '1',
            display: 'flex',
            marginY: 2,
            justifyContent: 'center',
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <Box sx={{ display: { md: 'none' } }}>
              <MobileDatePicker
                inputFormat="yyyy-MM-dd"
                value={searchDate}
                onChange={updateSearchDate}
                // eslint-disable-next-line react/jsx-props-no-spreading
                renderInput={(params) => <TextField {...params} />}
                minDate={new Date('2020-01-23')}
                maxDate={new Date()}
                disableCloseOnSelect={false}
              />
            </Box>
            <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
              <DesktopDatePicker
                inputFormat="yyyy-MM-dd"
                value={searchDate}
                onChange={updateSearchDate}
                // eslint-disable-next-line react/jsx-props-no-spreading
                renderInput={(params) => <TextField {...params} />}
                minDate={new Date('2020-01-23')}
                maxDate={new Date()}
              />
            </Box>
          </LocalizationProvider>
        </Box>
        <WhiteIconButton>
          <SearchIcon />
        </WhiteIconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
