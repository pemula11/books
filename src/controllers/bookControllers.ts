import { Request, Response } from "express";
import { body, param, validationResult } from "express-validator";

import BookService from "../services/BookService";



class BookController {
  async index(req: Request, res: Response) {
    const books = await BookService.findAll();
    res.json(books);
  }


  async store(req: Request, res: Response) {
    
    const validate = validationResult(req);
    if (!validate.isEmpty()) {
      return res.status(400).json({ errors: validate.array() });
    }
   
    try {
      const book = await BookService.create(req.body);
      res.status(201).json(book);
    } catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message,
      })
    }
    
  }



  async update(req: Request, res: Response) {
    const validate = validationResult(req);
    if (!validate.isEmpty()) {
      return res.status(400).json({ errors: validate.array() });
    }
    const id = req.params.id;
    const bookExists = await BookService.findById(Number(id));
    if (!bookExists) {
      return res.status(404).json({
        status: "error",
        message: "Book not found",
      });
    }
    try {
      const book = await BookService.update(bookExists, req.body);
      res.json({
        status: "success",
        data: book,
      })
    }
    catch (error: any) {
      res.status(500).json({
        status: "error",
        message: error.message,
      })
    }
    
  }


}

export default new BookController();
