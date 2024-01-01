import { NextFunction, Request, Response } from "express";
import { AuthRequest } from "../types/global.interface";
import { verifyJWTToken } from "../utils/verifyJWTToken";
import { tokenService } from "../services/TokenService";
import { UserInterface } from "../modules/User/user.interface";

export default (req: Request & { user: Partial<UserInterface> }, res: Response, next: NextFunction) => {
   const jwtBearerToken = req.header('Authorization') || ''
   if(!jwtBearerToken) return res.status(401).json({
      message: 'Authorization error! No token!'
   })

   const token = jwtBearerToken.split(' ')[1]

   try {
       const userData: any = tokenService.verifyJWTToken(token); 
      //  const user = tokenService.encryptPassword
      req.user = userData.uniqueId;

   } catch (error) {
      return res.status(401).json({
         message: 'Authorization error!'
      })
   }

   
   next() 
}