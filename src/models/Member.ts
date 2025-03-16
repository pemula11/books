import { DataTypes, Model } from "sequelize";
import {sequelize} from "../config/database";
import Borrow from "./Borrow";




/**
 * @swagger
 * components:
 *   schemas:
 *     Member:
 *       type: object
 *       properties:
 *         id:
 *           type: integer
 *           format: int32
 *           description: The unique identifier for a member
 *         code:
 *           type: string
 *           maxLength: 128
 *           description: Member's unique code
 *         name:
 *           type: string
 *           maxLength: 128
 *           description: Member's full name
 *         email:
 *           type: string
 *           maxLength: 128
 *           format: email
 *           description: Member's email address
 *         penaltyUntil:
 *           type: string
 *           format: date-time
 *           description: Date until which the member is penalized
 *         createdAt:
 *           type: string
 *           format: date-time
 *           description: Record creation timestamp
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           description: Record last update timestamp
 *         borrows:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Borrow'
 *           description: List of books borrowed by the member
 *       required:
 *         - code
 *         - name
 *         - email
 */

class Member extends Model {
    public id!: number;
    public code!: string;
    public name!: string;
    public email!: string;
    public penaltyUntil!: Date;
    public readonly createdAt!: Date;
    public readonly updatedAt!: Date;

    public readonly borrows?: Borrow[];

    static associate(){
        Member.hasMany(Borrow, {
            sourceKey: "id",
            foreignKey: "memberId",
            as: "borrows"
        })
    }


}

Member.init({

    id: {
        type: DataTypes.INTEGER.UNSIGNED,
        autoIncrement: true,
        primaryKey: true,
    },
    code: {
        type:  DataTypes.STRING(128),
        allowNull: false,
    },
    name: {
        type:  DataTypes.STRING(128),
        allowNull: false,
    },
    email: {
        type:  DataTypes.STRING(128),
        allowNull: false,
    },
    penaltyUntil: {
        type:  DataTypes.DATE(),
        allowNull: true,
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
    modelName: "members",
    tableName: "members",
});


export default Member;