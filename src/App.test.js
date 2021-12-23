import React from 'react';
import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import '@testing-library/jest-dom';
import renderer from 'react-test-renderer';
import store from './redux/configureStore';
import Home from './pages/Home';

it('Loading screen renders when on first render', () => {
  render(
    <Provider store={store}>
      <Router>
        <Home />
      </Router>
    </Provider>,
  );

  const progress = screen.getByTestId('progress');
  expect(progress).toBeInTheDocument();
});

it('Home renders correctly', () => {
  const tree = renderer
    .create(
      <Provider store={store}>
        <Router>
          <Home />
        </Router>
      </Provider>,
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
