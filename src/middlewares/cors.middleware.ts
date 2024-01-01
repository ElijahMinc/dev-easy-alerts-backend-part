import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types/global.interface";
import { verifyJWTToken } from "../utils/verifyJWTToken";

export default (_: Request, res: Response, next: NextFunction) => {
   
   res.header("Access-Control-Allow-Origin", "http://localhost:3000");
   res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
   res.header("Access-Control-Allow-Methods", "GET, POST, PUT, OPTIONS, DELETE");
   next();

}