import { body, validationResult } from "express-validator";

export const registerValidator = [
    body("username")
    .trim()
    .notEmpty()
    .withMessage("Username is required")
    .isLength({ min: 2, max: 30 })
    .withMessage("Username must be between 3 and 30 character")
    .matches(/^[a-zA-Z0-9_]+$/)
    .withMessage("Username can only contain letters, numbers and underscore"),
    
    body("email")
    .trim()
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Enter a valid email address"),
    
    body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 6 })
    .withMessage("Password must contain atleast 6 character"),
    
    validate
];

export function validate(req, res, next) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({
      errors: errors.array(),
    });
  }
  next();
}
