import { cryptoArray } from "../../data/cryptoArray";
import { stocksArray } from "../../data/stocksArray";

export const searchSuggestions = (array, match) => {
  return array.filter((elem) => elem.contain(match)).slice(0, 20);
};
