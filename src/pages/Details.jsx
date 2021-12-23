import { ArrowDropUp } from '@mui/icons-material';
import { Grid, styled, Typography } from '@mui/material';
import React from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { WhiteTypoGraphy, StatsTypography, getSvgPath } from './Home';

const DarkGrid = styled(Grid)`
  background-color: ${({ theme }) => theme.palette.secondary.dark};
  min-height: 50px;
  line-height: 50px;
  /* border: 1px solid ${({ theme }) => theme.palette.secondary.main} */
  padding-left: 2rem;
  padding-block: 1rem;
  color: white;
`;

const RegionsGrid = styled(Grid)`
  padding-block: 2;
  background-color: ${({ theme }) => theme.palette.secondary.dark};

  &:nth-of-type(2n) {
    & > * {
      background-color: ${({ theme }) => theme.palette.secondary.main};
    }
  }
`;

const Details = () => {
  const { countryName } = useParams();
  const { countries } = useSelector((state) => state.reports);
  const country = countries[countryName];

  return (
    <Grid container>
      <Grid item xs={12}>
        <div>
          {countries && (
            <img
              src={getSvgPath(country.id)}
              alt={`${country.name} map`}
              style={{
                width: '60%  ',
                aspectRatio: '1/1',
                margin: '0 auto ',
                display: 'block',
                filter: 'invert(0.8)',
              }}
            />
          )}
        </div>
      </Grid>
      <Grid
        item
        xs={12}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: 2,
        }}
      >
        <WhiteTypoGraphy variant="h5" component="h1" sx={{ fontWeight: 'bolder', display: 'flex' }}>
          {country.name}
          <StatsTypography
            sx={{
              display:
                country.today_confirmed * country.today_vs_yesterday_confirmed === 0
                  ? 'none'
                  : null,
            }}
          >
            <ArrowDropUp fontSize="large" />
            <Typography variant="body2" component="p">
              {parseInt(country.today_confirmed * country.today_vs_yesterday_confirmed, 10)}
            </Typography>
          </StatsTypography>
        </WhiteTypoGraphy>
      </Grid>

      <Grid container sx={{ mt: 2, paddingBlock: 2, backgroundColor: 'secondary.dark' }}>
        <DarkGrid item xs={12}>
          <Typography
            variant="h5"
            sx={{
              p: 0,
              height: '50px',
              lineHeight: '50px',
              textAlign: 'center',
            }}
          >
            All time stats
          </Typography>
        </DarkGrid>
        <DarkGrid item xs={6}>
          <Typography variant="h6" sx={{ fontWeight: 'bolder' }} component="p">
            {country.today_confirmed}
          </Typography>
          <Typography variant="body2" component="p">
            Confirmed cases
          </Typography>
        </DarkGrid>
        <DarkGrid item xs={6}>
          <Typography variant="h6" sx={{ fontWeight: 'bolder' }} component="p">
            {country.today_open_cases}
          </Typography>
          <Typography variant="body2" component="p">
            Open cases
          </Typography>
        </DarkGrid>
        <DarkGrid item xs={6}>
          <Typography variant="h6" sx={{ fontWeight: 'bolder' }} component="p">
            {country.today_deaths}
          </Typography>
          <Typography variant="body2" component="p">
            Deaths
          </Typography>
        </DarkGrid>
        <DarkGrid item xs={6}>
          <Typography variant="h6" sx={{ fontWeight: 'bolder' }} component="p">
            {country.today_recovered}
          </Typography>
          <Typography variant="body2" component="p">
            Recovered
          </Typography>
        </DarkGrid>
      </Grid>
      {country.regions.length ? (
        country.regions.map((region) => (
          <RegionsGrid key={region.id} container>
            <DarkGrid item xs={12} sx={{ display: 'flex', flexDirection: 'column' }}>
              <Typography
                variant="h5"
                component="h5"
                sx={{
                  p: 0,
                  height: '50px',
                  lineHeight: '50px',
                  fontWeight: 'bolder',
                }}
                noWrap
              >
                {region.name}
              </Typography>
              <StatsTypography>
                <Grid item xs={3}>
                  <Typography variant="body2" component="p" sx={{ pr: 1 }}>
                    {region.today_confirmed}
                    <br />
                    cases
                  </Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography variant="body2" component="p" sx={{ pr: 1 }}>
                    {region.today_open_cases}
                    <br />
                    open cases
                  </Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography variant="body2" component="p" sx={{ pr: 1 }}>
                    {region.today_deaths}
                    <br />
                    deaths
                  </Typography>
                </Grid>

                <Grid item xs={3}>
                  <Typography variant="body2" component="p" sx={{ pr: 1 }}>
                    {region.today_recovered}
                    <br />
                    recovered
                  </Typography>
                </Grid>
              </StatsTypography>
            </DarkGrid>
          </RegionsGrid>
        ))
      ) : (
        <WhiteTypoGraphy
          variant="body1"
          component="h5"
          sx={{
            textAlign: 'center',
            width: '100%',
            fontWeight: 'bolder',
            lineHeight: '50px',
          }}
        >
          There are no regions data for
          {' '}
          {country.name}
        </WhiteTypoGraphy>
      )}
    </Grid>
  );
};
export default Details;
