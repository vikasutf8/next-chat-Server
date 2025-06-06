import { Request, Response } from "express";
import prisma from "../config/db.config.js";

class ChatGroupController {
  static async index(req: Request, res: Response) {
    try {
      const user = req.body;
      const groups = await prisma.chatGroup.findMany({
        where: {
          user_id: user.id,
        },
        orderBy: {
          created_at: "desc",
        },
      });
      //validation handle on frontend side
      return res.status(200).json({
        message: "Fetch group chat success",
        data: groups,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Store group chat failed",
        error,
      });
    }
  }

  static async show(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const groups = await prisma.chatGroup.findUnique({
        where: {
          id: id,
        },
      });
      //validation handle on frontend side
      return res.status(200).json({
        message: "Fetch group chat success",
        data: groups,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Store group chat failed",
        error,
      });
    }
  }

  static async store(req: Request, res: Response) {
    try {
      const body = req.body;
      const user = req.body;
      await prisma.chatGroup.create({
        data: {
          title: body.title,
          passcode: body.passcode,
          user_id: user.id,
        },
      });
      //validation handle on frontend side
      return res.status(200).json({
        message: "Store group chat success",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Store group chat failed",
        error,
      });
    }
  }

   static async update(req: Request, res: Response) {
    try {
      const body = req.body;
      const {id} =req.params;
      await prisma.chatGroup.update({
        data:{
            title: body.title,
            passcode: body.passcode,
        },
        where:{
            id:id
        }
      })
      //validation handle on frontend side
      return res.status(200).json({
        message: "Store group chat updated ",
      });
    } catch (error) {
      return res.status(500).json({
        message: "Store group chat failed",
        error,
      });
    }
  }


    static async destroy(req: Request, res: Response) {
    try {
      const { id } = req.params;
        await prisma.chatGroup.delete({
        where: {
          id: id,
        },
      });
      //validation handle on frontend side
      return res.status(200).json({
        message: "Fetch group chat deleted success",
        
      });
    } catch (error) {
      return res.status(500).json({
        message: "Store group chat deleted failed",
        error,
      });
    }
  }
}



export default ChatGroupController;
