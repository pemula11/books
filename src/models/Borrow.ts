import { DataTypes, Model } from "sequelize";
import {sequelize} from "../config/database";
import Book from "./Book";
import Member from "./Member";


/**
 * @swagger
 * components:
 *   schemas:
 *     Borrow:
 *       type: object
 *       properties:
 *         
 *         bookId:
 *           type: integer
 *           description: ID of the borrowed book
 *         memberId:
 *           type: integer
 *           description: ID of the member who borrowed the book
 *         borrowedAt:
 *           type: string
 *           format: date-time
 *           description: Date when the book was borrowed
 *         returnedAt:
 *           type: string
 *           format: date-time
 *           description: Date when the book was returned (null if not returned)
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Record creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Record last update timestamp
 *       required:
 *         - bookId
 *         - memberId
 *         - borrowedAt
 */

class Borrow extends Model {
    public id!: number;
    public bookId!: number;
    public memberId!: number;
    public borrowedAt!: Date;
    public returnedAt!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public readonly book?: Book;
    public readonly member?: Member;

    static associate(){
        Borrow.belongsTo(Book, {
            targetKey: "id",
            foreignKey: "bookId",
            as: "books"
        });
        Borrow.belongsTo(Member, {
            targetKey: "id",
            foreignKey: "memberId",
            as: "members"
        });
    }
        
}

Borrow.init({

    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    bookId: {
        type:  DataTypes.INTEGER(),
        allowNull: false,
        
    },
    memberId: {
        type:  DataTypes.INTEGER(),
        allowNull: false
    },
    borrowedAt: {
        type:  DataTypes.DATE(),
        allowNull: false,
        field: "borrowDate",
    },
    returnedAt: {
        type:  DataTypes.DATE(),
        allowNull: true,
        field: "returnDate",
    },
    createdAt: {
        type:  DataTypes.DATE(),
        allowNull: false,
    },
    updatedAt: {
        type:  DataTypes.DATE(),
        allowNull: false,
    },
},
{
    sequelize,
    modelName: "borrows",
    tableName: "borrows",
});




export default Borrow;