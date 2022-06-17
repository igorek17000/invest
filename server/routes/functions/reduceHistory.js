export const reduceHistory = (history, actionResult) => {
  const historyReducer = [];
  history.map((elem) => {
    for (let i = 1; i <= historyReducer.length; i++) {
      if (historyReducer[i - 1].name === elem.symbol) {
        historyReducer[i - 1].amount += elem.amount;
        return; // this return legacy code :D
      }
    }
    historyReducer.push(elem);
  });

  const NoneZeroHistoryReducer = historyReducer.filter(
    (elem) => elem.amount > 0
  );

  NoneZeroHistoryReducer.map((elem) => {
    if (actionResult && elem.symbol === actionResult.symbol) {
      elem.total = elem.amount * actionResult.price;
    } else {
      elem.total = elem.amount * elem.currentPrice;
    }
  });

  return NoneZeroHistoryReducer;
};
