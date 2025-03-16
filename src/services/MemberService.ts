import Member from "../models/Member";
import MemberRepository from "../repository/MemberRepository";

class MemberService {
    async findAll() {
        return await MemberRepository.findAllAndCountBorrows();
    }

    async findById(id: number) {
        return await MemberRepository
            .findById(id);
    }

    async create(member: any) {
        return await MemberRepository.create(member);
    }

    async update(memberData: Member, member: any){
        return await MemberRepository.update(memberData, member);
    }
}

export default new MemberService();