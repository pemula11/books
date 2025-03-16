import express from 'express';
import borrowController from '../controllers/borrowController';
import wrapAsync from '../utils/warpAsync';


const router = express.Router();

router.get('/', wrapAsync(borrowController.index));
router.post('/', wrapAsync(borrowController.store));
router.post('/return/:id', wrapAsync(borrowController.returnBook));


/**
 * @swagger
 * tags:
 *   name: Borrows
 *   description: Book borrowing management
 */

/**
 * @swagger
 * /borrows:
 *   get:
 *     summary: Returns all borrow records
 *     tags: [Borrows]
 *     responses:
 *       200:
 *         description: List of all borrow records
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Borrow'
 *   post:
 *     summary: Create a new borrow record
 *     tags: [Borrows]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Borrow'
 *     responses:
 *       201:
 *         description: Borrow record created successfully
 *       400:
 *         description: Invalid input
 *       404:
 *         description: Book or member not found
 * 
 * /borrows/return/{id}:

 *   put:
 *     summary: Return a book
 *     tags: [Borrows]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: Borrow record ID
 *     responses:
 *       200:
 *         description: Book returned successfully
 *       404:
 *         description: Borrow record not found
 *       400:
 *         description: Book already returned
 */



export default router;
