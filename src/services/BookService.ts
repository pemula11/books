import Book from "../models/Book";
import BookRepository from "../repository/BookRepository";


class BookService {
    async findAll() {
        return await BookRepository.findAllAssociations();
    }


    async findById(id: number) {
        return await BookRepository
            .findById(id);
    }

    async checkIfBookExists(id: number) {
        const book = await BookRepository.findById(id);
        if (!book) {
            return "Book not found";
        }
        if (book.stock === 0) {
            return "Book out of stock";
        }
        return book;
    }

    async create(book: any) {
        return await BookRepository.create(book);
    }

    async update(bookData: Book, book: any){
        return await BookRepository.update(bookData, book);
    }

}

export default new BookService();
