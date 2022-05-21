import { print } from "../functions/functions.js";

export const test = (req, res, next) => {
  print("test.js line 3, req: ", req);
  return next();
};
