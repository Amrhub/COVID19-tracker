// CONST TYPES

// initial state
const initialState = [];

// Action Creators

// reducer
const reducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case 'placeholder':
      return payload;
    default:
      return state;
  }
};

export default reducer;
