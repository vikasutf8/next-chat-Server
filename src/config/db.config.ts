import { PrismaClient } from "@prisma/client";
import { log } from "console";


const prisma = new PrismaClient({
    log:["error","query"]

});

export default prisma