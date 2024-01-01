import { NextFunction, Request, Response } from "express";
import { Roles } from "../constants";
import { UserInterface } from "../modules/User/user.interface";
import { verifyJWTToken } from "../utils/verifyJWTToken";

export const accessByRole = (roles: Roles[]) => (req: Request, res: Response, next: NextFunction) => {
   if (req.method === "OPTIONS") {
      next()
  }

  try {
   const jwtBearerToken = req.header('Authorization') || ''

   if(!jwtBearerToken) return res.status(401).json({
      message: 'Authorization error! No token!'
   })

   const token = jwtBearerToken.split(' ')[1]
   
   const user = verifyJWTToken<UserInterface>(token) as any
   let hasRole = false 

   roles.forEach(role => {
      if(role.includes(user.uniqueId.role)){
         hasRole = true
      }
   });

   if (!hasRole) {
       return res.status(403).json({message: "You dont have access"})
   }

   next();
} catch (e) {
   console.log(e)
   return res.status(403).json({message: "Пользователь не авторизован"})
}

}