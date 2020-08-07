export const getTags = (state) => {
  const tags = {};

  state.account.accounts.forEach((account) => {
    account.tags.forEach((tag) => {
      if (tags[tag]) {
        tags[tag] += 1;
      } else {
        tags[tag] = 1;
      }
    });
  });

  return Object.keys(tags).map((key) => ({
    name: key,
    title: key,
    count: tags[key] || 0,
  }));
};

export const getStates = (state) => {
  return state.account.accounts.reduce((states, account) => {
    const sections = account.address.split(',');
    const stateText = sections[sections.length - 2];

    if (stateText) {
      const usState = stateText.trim();

      if (states[usState]) {
        states[usState] += 1;
      } else {
        states[usState] = 1;
      }
    }

    return states;
  }, {});
};

export const getCreditScoreCount = (state) => {
  const creditCount = state.account.accounts.reduce((creditCount, account) => {
    // Only grabbing account with credit score above 100
    const key = Math.floor(account.credit / 100) * 100;

    if (creditCount[key]) {
      creditCount[key] += 1;
    } else {
      creditCount[key] = 1;
    }

    return creditCount;
  }, {});

  return Object.keys(creditCount).map((key) => ({
    name: key,
    count: creditCount[key],
  }));
};

export const calculateMortageGoalCompletion = (account) => {
  const PROPERTY_PRICE = 150000;
  const MAX_CREDIT_SCORE = 850;
  const downPaymentPercentage =
    (MAX_CREDIT_SCORE + 10 - account.credit) / 1000 + 0.075;

  return (
    (parseFloat(account.balance) / (downPaymentPercentage * PROPERTY_PRICE)) *
    100
  ).toFixed(0);
};

export const getMortageGoalCompletionCount = (state) => {
  const progressCounts = state.account.accounts.reduce(
    (allProgress, account) => {
      // Only grabbing account with credit score above 100
      const progress = calculateMortageGoalCompletion(account);

      const key = Math.floor(progress / 10) * 10;

      if (allProgress[key]) {
        allProgress[key] += 1;
      } else {
        allProgress[key] = 1;
      }

      return allProgress;
    },
    {},
  );

  return Object.keys(progressCounts).map((key) => ({
    name: `>=${key}%`,
    count: progressCounts[key],
  }));
};
