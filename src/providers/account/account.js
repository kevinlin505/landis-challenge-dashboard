export const types = {
  GET_ALL_ACCOUNTS: 'ACCOUNTS/GET_ALL_ACCOUNTS',
};

const initialState = {
  accounts: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case types.GET_ALL_ACCOUNTS: {
      return {
        ...state,
        accounts: [...action.accounts],
      };
    }

    default:
      return state;
  }
}

export const accountActions = {
  fetchAccounts: () => async (dispatch, getState) => {
    const requestUrl = 'https://landis-challenge.herokuapp.com/accounts';

    const res = await fetch(requestUrl, { method: 'GET' });

    if (res.status !== 200) {
      throw new Error('There is an issue retrieving all the accounts');
    }

    const accounts = await res.json();

    dispatch({
      type: types.GET_ALL_ACCOUNTS,
      accounts,
    });
  },
};
