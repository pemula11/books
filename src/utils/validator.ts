import { body, param, validationResult } from "express-validator";


export const validateCreateBook = [
  body("title").notEmpty().withMessage("Title is required"),
  body("author").notEmpty().withMessage("Author is required"),
  body("stock").notEmpty().withMessage("Stock is required"),
  body("stock").isInt({min: 0}).withMessage("Stock must be an integer and greater than or equal to 0"),  

];

export const validateUpdateBook = [
  body("title").optional().notEmpty().withMessage("Title is required"),
  body("author").optional().notEmpty().withMessage("Author is required"),
  body("stock").optional().notEmpty().withMessage("Stock is required"),
  body("stock").optional().isInt({min: 0}).withMessage("Stock must be an integer and greater than or equal to 0"),  
  
];

export const validateCreateMember = [
  body("name").notEmpty().withMessage("Name is required"),
  body("email").notEmpty().withMessage("Email is required"),
  body("email").isEmail().withMessage("Email is not valid"),
  body("phone").notEmpty().withMessage("Phone is required"),
];

export const validateUpdateMember = [
  body("name").optional().notEmpty().withMessage("Name is required"),
  body("email").optional().notEmpty().withMessage("Email is required"),
  body("email").optional().isEmail().withMessage("Email is not valid"),
  body("phone").optional().notEmpty().withMessage("Phone is required"),
];