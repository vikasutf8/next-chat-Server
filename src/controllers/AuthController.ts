import { Request,Response } from "express";
import prisma from "../config/db.config.js";
import jwt from "jsonwebtoken"

interface LoginPayloadType{
    name:string;
    email:string;
    provider:string;
    image?:string;
    oauth_id:string

}

class AuthController {
    


static async login(req: Request, res: Response) {

    try {
        const body:LoginPayloadType = req.body;
        let findUser =await prisma.user.findUnique({
            where:{
                email:body.email
            }
        })
        if(!findUser){
            findUser =await prisma.user.create({
                data: body
            })
        }
        //payload token
        let jwtPayload ={
            name:body.name,
            email:body.email,
            id :findUser.id,
        }

        const token = jwt.sign(jwtPayload,"hmfhjghlkjgu",{
            expiresIn:3600
        })
        return res.status(200).json({
            message :"login success",
            user:{
                ...findUser,
                token:`Bearer ${token}`
            }
        })
        
    } catch (error) {
        return res.status(500).json({
            message :"login failed",
            error
        })
    }
}
}

export default AuthController;