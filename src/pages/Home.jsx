import styled from '@mui/material/styles/styled';
import {
  Card, CardContent, CardMedia, Grid, IconButton, Typography,
} from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { ArrowCircleRightOutlined, ArrowDropUp } from '@mui/icons-material';
import RemoveIcon from '@mui/icons-material/Remove';
import _ from 'lodash';
import { useNavigate } from 'react-router-dom';

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
  &:nth-of-type(4n),
  &:first-of-type,
  &:nth-of-type(4n + 1) {
    background-color: ${({ theme }) => theme.palette.background.paper};
    & > * {
      background-color: ${({ theme }) => theme.palette.background.paper};
    }
  }
`;

const Home = () => {
  const reports = useSelector((state) => state.reports);
  const navigate = useNavigate();

  return (
    <>
      {reports.countries ? (
        <Grid container sx={{ display: 'flex', flexDirection: 'column' }}>
          <Grid container sx={{ paddingX: 2 }}>
            <Grid item xs={6}>
              <div>
                {reports?.globalReport && (
                  <img
                    src={reports.globalReport.imagePath}
                    alt="Worldwide map"
                    style={{ height: '200px', aspectRatio: '1/1' }}
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
              && _.map(reports.countries, (country) => (
                <RenderCountries item xs={6} key={country.id}>
                  <Card sx={{ position: 'relative', borderRadius: '0 !important' }}>
                    <IconButton
                      aria-label="show more"
                      sx={{
                        position: 'absolute',
                        top: '0',
                        right: '0',
                        color: '#000',
                      }}
                      onClick={() => {
                        navigate(`/details/${country.name}`);
                      }}
                    >
                      <ArrowCircleRightOutlined />
                    </IconButton>
                    {country.imagePath ? (
                      <CardMedia
                        component="img"
                        src={country.imagePath}
                        alt="Country map"
                        sx={{ width: '100%', aspectRatio: '1/1' }}
                      />
                    ) : (
                      <CardMedia
                        component="img"
                        src="/src/assets/placeholder.svg"
                        alt="Country map"
                        sx={{ width: '100%', aspectRatio: '1/1' }}
                      />
                    )}
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
        <div>Loading...</div>
      )}
    </>
  );
};

export default Home;
