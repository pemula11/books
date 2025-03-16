import {Op} from 'sequelize';
import Member from '../models/Member';
import {sequelize} from '../config/database';
import Borrow from '../models/Borrow';




class MemberRepository {

    constructor() {
        Member.hasMany(Borrow, { 
            sourceKey: "id",
            foreignKey: "memberId",
            as: "borrows"

        });
    }

    async findAll() {
        return await Member.findAll();
    }

    async findAllAssociations() {
        return await Member.findAll();
    }

    async findAllAndCountBorrows() {
        const members = await Member.findAll({
            include: [
                {
                    model: Borrow,
                    as: "borrows",
                    order: [['createdAt', 'DESC']]
                }
            ],
        });
        
        
        return members;
    }

    async findById(id: number) {
        return await Member.findByPk(id);
    }


    async findByIdAndBorrows(id: number) {
        const members = await Member.findByPk(id, {
            include: [
                {
                    model: Borrow,
                    as: "borrows",
                    order: [['createdAt', 'DESC']]
                }
            ]
        });
        
        return members;
    }

    async findByCode(code: string) {
        return await Member.findAll({
            where: {
                code: {
                    [Op.like]: `%${code}%`
                }
            }
        });
    }

    async create(member: any) {
        return await Member.create(member);
    }

    async update(memberData: Member, member: any){
        const updatedMember = memberData.update(member);
        return updatedMember;
    }

   
}

export default new MemberRepository();