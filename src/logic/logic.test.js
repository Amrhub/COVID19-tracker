import getIsoCode from './convertToIso3';
import formatCountries from './getCountries';

describe('logic testing', () => {
  it('countries are being deconstructed from API format correctly', () => {
    const data = {
      dates: {
        '2020-03-23': {
          countries: {
            'United States': {},
            'United Kingdom': {},
          },
        },
      },
    };

    const countries = formatCountries(data);

    expect(countries).toEqual({ 'United States': {}, 'United Kingdom': {} });
  });

  describe('getIsoCode function tests', () => {
    it('returns eg if given Egypt ', () => {
      const isoCode = getIsoCode('Egypt');

      expect(isoCode).toEqual('eg');
    });

    it('not case sensitive: returns eg if given EGYPT  ', () => {
      const isoCode = getIsoCode('EGYPT');

      expect(isoCode).toEqual('eg');
    });
  });
});
