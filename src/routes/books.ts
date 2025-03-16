import express from 'express';
import bookControllers from '../controllers/bookControllers';
import wrapAsync from '../utils/warpAsync';
import { validateCreateBook, validateUpdateBook } from '../utils/validator';
const router = express.Router();

/**
 * @swagger
 * /books:
 *   get:
 *     tags: [Books]
 *     summary: Get all books
 *     responses:
 *       200:
 *         description: List of all books
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Book'
 *   post:
 *     tags: [Books]
 *     summary: Create a new book
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Book'
 *     responses:
 *       201:
 *         description: Book created successfully
 *       400:
 *         description: Invalid input
 */

router.get('/', wrapAsync(bookControllers.index));
router.post('/', validateCreateBook, wrapAsync(bookControllers.store));
router.put('/:id', validateUpdateBook, wrapAsync(bookControllers.update));


export default router;