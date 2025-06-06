import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

const authMiddleware = (req: Request, res: Response, next: NextFunction) => {

    const authHeader = req.headers.authorization;
    if(!authHeader){
        return res.status(401).json({
            message :"Unauthorized"
        })
    }
    const token = authHeader.split(" ")[1]; // remove bearer from the string
        jwt.verify(token, "hmfhjghlkjgu",(err,user)=>{
            if(err){
                return res.status(401).json({
                    message :"Unauthorized"
                })
            }
           req.user =user as AuthUser
        })
        next();
    }



    export default authMiddleware;