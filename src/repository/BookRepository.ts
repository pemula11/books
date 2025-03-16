import {Op, Transaction} from 'sequelize';
import Book from '../models/Book';
import {sequelize} from '../config/database';

class BookRepository {
    async findAll() {
        return await Book.findAll();
    }

    async findAllAssociations() {
        return await Book.findAll({
            include: ["borrows"]
        });
    }

    async findById(id: number) {
        return await Book.findByPk(id);
    }

    async findByTitle(title: string) {
        return await Book.findAll({
            where: {
                title: {
                    [Op.like]: `%${title}%`
                }
            }
        });
    }

    async create(book: any) {
        return await Book.create(book);
    }

    async update(bookData: Book, book: any){
        const updatedBook = await bookData.update(book);
        return updatedBook;
    }
    

    async incrementStock(book: Book, transaction: Transaction) {
        const t = transaction || await sequelize.transaction();
        if (!book) throw new Error("Book not found");

        try {
            await book.increment("stock", {transaction: t});
            await book.reload();
            if (!transaction) await t.commit();
            return book;
        }
        catch (error) {
            if (!transaction) await t.rollback();
            throw error;
        }
    }

    async decrementStock(book: Book, transaction: Transaction) {
        const t = transaction || await sequelize.transaction();
        if (!book) throw new Error("Book not found");
        if (book.stock <= 0) throw new Error("Book out of stock");

        try {
            await book.decrement("stock", {transaction: t});
            await book.reload();
            if (!transaction) await t.commit();
            return book;
        }
        catch (error) {
            if (!transaction) await t.rollback();
            throw error;
        }
    }

    
    

}

export default new BookRepository();