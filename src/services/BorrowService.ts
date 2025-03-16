
import Borrow from "../models/Borrow";
import BorrowRepository from "../repository/BorrowRepository";
import {sequelize} from '../config/database';
import BookRepository from "../repository/BookRepository";
import MemberRepository from "../repository/MemberRepository";

class BorrowService {
    async findAll() {
        return await BorrowRepository.findAll();
    }

    async findById(id: number) {
        return await BorrowRepository.findById(id);
    }

    async borrowBook(borrowData: any) {
        const transaction = await sequelize.transaction();
        try {
            
            const borrow = await BorrowRepository.create(borrowData, transaction);
            const book = await BookRepository.findById(borrowData.bookId);
            if (!book) throw new Error("Book not found");
            if (book.stock === 0) throw new Error("Book out of stock");
            
            const member = await MemberRepository.findByIdAndBorrows(borrowData.memberId);
            if (!member) throw new Error("Member not found");
            if (member.borrows && member.borrows.length > 0) {

                if (member.borrows[0].returnedAt === null) throw new Error("Member has not returned the book");
            }

            if (member.penaltyUntil) {
                const now = new Date();
                if (now < member.penaltyUntil) throw new Error("Member has penalty");
            }
            

            
            
            await BookRepository.decrementStock(book, transaction);
            await transaction.commit();

            return borrow;
        }
        catch (error: any) {
            await transaction.rollback();
            throw error;
        }
    }

    async returnBook(id : number,  borrow: any) {
        const transaction = await sequelize.transaction();
        try {
            const borrowData = await BorrowRepository.findById(id);
            if (!borrowData) throw new Error("Borrow not found");
            if (borrowData.returnedAt !== null) throw new Error("Book already returned");
            const now = new Date();
            borrow.returnedAt = now;

            const book = await BookRepository.findById(borrowData.bookId);
            if (!book) throw new Error("Book not found");
            await BookRepository.incrementStock(book, transaction);
            
            const borrowDate = new Date(borrowData.borrowedAt);
            const diffTime = Math.abs(now.getTime() - borrowDate.getTime());
            const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

            if (diffDays > 7) {
                const member = await MemberRepository.findById(borrowData.memberId);
                if (!member) throw new Error("Member not found");
                const penaltyDate = new Date();
                penaltyDate.setDate(penaltyDate.getDate() + 3);
                member.penaltyUntil = penaltyDate;
                await member.save({ transaction });
    
            }

            const updatedBorrow = await BorrowRepository.update(borrowData, borrow, transaction);
            transaction.commit();
            return updatedBorrow;
        }
        catch (error: any) {
            await transaction.rollback();
            throw error;
        }
    }

    

  
}

export default new BorrowService();