import {Op, Transaction} from 'sequelize';
import Borrow from '../models/Borrow';
import {sequelize} from '../config/database';
import Book from '../models/Book';
import Member from '../models/Member';

class BorrowRepository {
constructor() {
    Borrow.belongsTo(Book, { foreignKey: 'bookId', as: 'book' });
    Borrow.belongsTo(Member, { foreignKey: 'memberId', as: 'member' });
}

    async findAll(){
        return await Borrow.findAll({
            include: ["book", "member"]
        });
    }

    async findById(id: number){
        return await Borrow.findByPk(id, {
            include: ["book", "member"]});
    }

    async findByBookAndMember(bookId: number, memberId: number){
        return await Borrow.findOne({
            where: {
                bookId: bookId,
                memberId: memberId
            },
            include: ["book", "member"]
        });
    }

    async create(borrowData: any, transaction: Transaction){
        const t = transaction || await sequelize.transaction();
        try {
            const borrow = await Borrow.create({
                bookId: borrowData.bookId,
                memberId: borrowData.memberId,
                borrowedAt: new Date(),
                returnedAt: null
            }, 
            {
                transaction: t,
                include: ["book", "member"]
            });
            if (!transaction) await t.commit();
            return borrow;
        }
        catch (error) {
            if (!transaction) await t.rollback();
            throw error;
        }
    }

    async update(borrowData: Borrow, borrow: any, transaction: Transaction){
        const t = transaction || await sequelize.transaction();
        if (!borrow) throw new Error("Borrow not found");
        try {
            const updatedBorrow = await borrowData.update(borrow, {
                transaction: t,
                include: ["book", "member"]
            });
            if (!transaction) await t.commit();
            return updatedBorrow;
        }
        catch (error) {
            if (!transaction) await t.rollback();
            throw error;
        }
       
    }

   

}

export default new BorrowRepository();