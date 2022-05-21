import { check } from "express-validator";

export const loginValidate = [
  check("username")
    .trim()
    .notEmpty()
    .withMessage("Username can't be empty")
    .matches(/([0-9a-zA-Z_])/)
    .withMessage("Please remove any special-characters or spaces"),
  check("password")
    .trim()
    .notEmpty()
    .withMessage("Password can't be empty")
    .isLength({ min: 8 })
    .withMessage("Password should be at least 8"),
];

export const signupValidate = check("repeat_password")
  .trim()
  .notEmpty()
  .withMessage("Repeat-Password can't be empty")
  .isLength({ min: 8 })
  .withMessage("Repeat-Password should be at least 8");
