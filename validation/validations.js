import { body } from "express-validator"

export const registerValidation = [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Password must contain at least 6 characters').isLength({min: 6}),
  body('name', 'Enter your name').isLength({min: 1}),
  body('avatarUrl').optional().isURL(),
]

export const loginValidation = [
  body('email', 'Invalid email format').isEmail(),
  body('password', 'Password must contain at least 6 characters').isLength({min: 6}),
]

export const collectionCreateValidation = [
  body('title', 'Enter collection title').isLength({min: 1}).isString(),
  body('description', 'Enter collection description').optional().isString(),
  body('topic', 'Select collection topic').isLength({min: 1}).isString(),
  body('image').optional().isString(),
]