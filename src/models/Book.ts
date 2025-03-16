import { DataTypes, Model, Transaction } from "sequelize";
import {sequelize} from "../config/database";
import Borrow from "./Borrow";

/**
 * @swagger
 * components:
 *   schemas:
 *     Book:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - stock
 *       properties:
 *         id:
 *           type: integer
 *           description: Auto-generated ID
 *         title:
 *           type: string
 *           description: Book title
 *         author:
 *           type: string
 *           description: Book author
 *         stock:
 *           type: integer
 *           description: Available copies
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 */


class Book extends Model {
    public id!: number;
    public title!: string;
    public author!: string;
    public stock!: number;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public readonly borrows?: Borrow;

    static associate(){
        Book.hasMany(Borrow, {
            sourceKey: "id",
            foreignKey: "bookId",
            as: "borrows"
        })
    }


}

Book.init({

    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    title: {
        type:  DataTypes.STRING(128),
        allowNull: false,
    },
    author: {
        type:  DataTypes.STRING(128),
        allowNull: false,
    },
    stock: {
        type:  DataTypes.INTEGER(),
        allowNull: false,
        defaultValue: 0,
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
    modelName: "books",
    tableName: "books",
});

Book.hasMany(Borrow, {
    sourceKey: "id",
    foreignKey: "bookId",
    as: "borrows"
});
   

export default Book;
