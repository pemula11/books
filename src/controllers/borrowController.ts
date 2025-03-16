import { Request, Response } from "express";
import { body, param, validationResult } from "express-validator";


import BorrowService from "../services/BorrowService";


export const validateCreateBorrow = [
  body("memberId").notEmpty().withMessage("Member ID is required"),
  body("bookId").notEmpty().withMessage("Book ID is required"),
];

const validateUpdateBorrow = [
  body("memberId").optional().notEmpty().withMessage("Member ID is required"),
  body("bookId").optional().notEmpty().withMessage("Book ID is required"),
];

class BorrowController {
    async index(req: Request, res: Response) {
        const borrows = await BorrowService.findAll();
        res.json(borrows);
    }

    async store(req: Request, res: Response) {
        const validate = validationResult(req);
        if (!validate.isEmpty()) {
            return res.status(400).json({ errors: validate.array() });
        }

        try {
            const borrow = await BorrowService.borrowBook(req.body);
            res.status(201).json(borrow);
            
        }
        catch (error: any) {
            res.status(500).json({
                status: "error",
                message: error.message,
            })
        }
    }

    async returnBook(req: Request, res: Response) {
        const validate = validationResult(req);
        if (!validate.isEmpty()) {
            return res.status(400).json({ errors: validate.array() });
        }

        try {
            const id = req.params.id;
            if (!id) {
                return res.status(400).json({
                    status: "error",
                    message: "Borrow ID is required",
                });
            }
            
            const borrow = await BorrowService.returnBook(Number(id),req.body);
            res.json(borrow);
        }
        catch (error: any) {
            res.status(500).json({
                status: "error",
                message: error.message,
            })
        }
    }
}

export default new BorrowController();