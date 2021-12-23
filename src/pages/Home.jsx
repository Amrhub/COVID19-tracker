import {
  styled,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { ArrowCircleRightOutlined, ArrowDropUp } from '@mui/icons-material';
import RemoveIcon from '@mui/icons-material/Remove';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';
import getIsoCode from '../logic/convertToIso3';

export const WhiteTypoGraphy = styled(Typography)(({ theme }) => ({
  color: theme.palette.common.white,
}));

export const StatsTypography = styled('div')`
  color: #feff59;
  font-weight: bold;
  display: flex;
  align-items: center;
`;

const RenderCountries = styled(Grid)`
  background-color: ${({ theme }) => theme.palette.secondary.dark};
  & > * {
    background-color: ${({ theme }) => theme.palette.secondary.dark};
  }
`;

const shouldItBeLight = (index) => {
  if (index % 4 === 0 || index % 4 === 1) {
    return true;
  }
  return false;
};

export const getSvgPath = (country) => {
  const countryName = country.replace(/_/g, ' ').replace('*', '');
  const countryIso = getIsoCode(countryName);
  return `https://raw.githubusercontent.com/djaiss/mapsicon/33ba28808f8d32b5bae0ffada9cadd07073852e1/all/${countryIso}/vector.svg`;
};

const Home = () => {
  const reports = useSelector((state) => state.reports);
  const navigate = useNavigate();

  return (
    <>
      {reports.isFetching && (
        <Container
          sx={{
            width: '100vw',
            height: '50vh',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <CircularProgress data-testid="progress" />
        </Container>
      )}
      {!reports.isFetching && reports.countries ? (
        <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
          <Grid container sx={{ paddingX: 2 }}>
            <Grid item xs={6}>
              <div>
                {reports?.globalReport && (
                  <img
                    src={reports.globalReport.imagePath}
                    alt="Worldwide map"
                    style={{
                      height: '200px',
                      aspectRatio: '1/1',
                      fill: 'white',
                      filter: 'brightness(2) invert(0.2)',
                    }}
                  />
                )}
              </div>
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                gap: 2,
              }}
            >
              <WhiteTypoGraphy variant="h5" component="h1" sx={{ fontWeight: 'bolder' }}>
                World Wide
              </WhiteTypoGraphy>
              <StatsTypography>
                <ArrowDropUp fontSize="large" />
                <Typography variant="body2" component="p">
                  {reports?.globalReport
                    && parseInt(
                      reports.globalReport.today_confirmed
                        * reports.globalReport.today_vs_yesterday_confirmed,
                      10,
                    )}
                </Typography>
              </StatsTypography>
            </Grid>
          </Grid>
          <Grid item xs={12} sx={{ backgroundColor: '#35548b', pt: '0 !important', mt: 2 }}>
            <WhiteTypoGraphy variant="body2" component="p" sx={{ pl: 2, fontWeight: 'bolder' }}>
              STATS BY COUNTRY
            </WhiteTypoGraphy>
          </Grid>

          <Grid container>
            {reports?.countries
              && _.map(reports.countriesArr, (country, index) => (
                <RenderCountries item xs={6} key={country.id}>
                  <Card
                    sx={{
                      position: 'relative',
                      borderRadius: '0 !important',
                      backgroundColor: shouldItBeLight(index + 1)
                        ? 'background.main'
                        : 'secondary.dark',
                    }}
                  >
                    <IconButton
                      aria-label="show more"
                      sx={{
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        color: '#fff ',
                      }}
                      onClick={() => {
                        navigate(`/details/${country.name}`);
                      }}
                    >
                      <ArrowCircleRightOutlined />
                    </IconButton>
                    <CardMedia
                      component="img"
                      src={getSvgPath(country.id)}
                      alt={`${country.name} map`}
                      sx={{
                        width: '65%',
                        aspectRatio: '1/1',
                        filter: 'invert(0.8)',
                        margin: '12px auto 0',
                      }}
                    />

                    <CardContent
                      sx={{
                        height: '70px',
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                      }}
                    >
                      <Typography
                        gutterBottom
                        variant="body2"
                        component="h3"
                        sx={{
                          textAlign: 'right',
                          fontWeight: 'bolder',
                        }}
                      >
                        {country.name}
                      </Typography>
                      {country.today_confirmed * country.today_vs_yesterday_confirmed > 0 ? (
                        <StatsTypography sx={{ justifyContent: 'flex-end' }}>
                          <ArrowDropUp fontSize="medium" />
                          <Typography variant="body2" component="p">
                            {parseInt(
                              country.today_confirmed * country.today_vs_yesterday_confirmed,
                              10,
                            )}
                          </Typography>
                        </StatsTypography>
                      ) : (
                        <StatsTypography sx={{ justifyContent: 'flex-end' }}>
                          <RemoveIcon fontSize="medium" />
                          <Typography variant="body2" component="p">
                            No new cases
                          </Typography>
                        </StatsTypography>
                      )}
                    </CardContent>
                  </Card>
                </RenderCountries>
              ))}
          </Grid>
        </Grid>
      ) : (
        !reports.isFetching && (
          <WhiteTypoGraphy
            sx={{
              height: '50vh',
              width: '100vw',
              lineHeight: '50vh',
              textAlign: 'center',
            }}
            variant="h4"
          >
            Failed to fetch data X_X
          </WhiteTypoGraphy>
        )
      )}
    </>
  );
};

export default Home;
