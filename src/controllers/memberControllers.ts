import { Request, Response } from "express";
import { body, param, validationResult } from "express-validator";

import MemberService from "../services/MemberService";



class MemberController {
    async index(req: Request, res: Response) {
        const members = await MemberService.findAll();
        res.json(members);
    }

    async store(req: Request, res: Response) {
        const validate = validationResult(req);
        if (!validate.isEmpty()) {
            return res.status(400).json({ errors: validate.array() });
        }

        try {
            const member = await MemberService.create(req.body);
            res.status(201).json(member);
        } catch (error: any) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }

    async update(req: Request, res: Response) {
        const validate = validationResult(req);
        if (!validate.isEmpty()) {
            return res.status(400).json({ errors: validate.array() });
        }
        const id = req.params.id;
        const memberExists = await MemberService.findById(Number(id));
        if (!memberExists) {
            return res.status(404).json({
                status: "error",
                message: "Member not found",
            });
        }
        try {
            const member = await MemberService.update(memberExists, req.body);
            res.json(member);
        } catch (error: any) {
            res.status(500).json({
                status: "error",
                message: error.message,
            });
        }
    }
}


export default new MemberController();