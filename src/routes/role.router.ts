import { Router } from "express";
import { RoleModel, UserModel } from "../modules";
import { Roles } from "../constants";
import { generateHashPassword } from "../utils/genereateHashPassword";
import { generateJWTToken } from "../utils/generateJWTToken";
import { UserDTO } from "../dto/UserDTO";
import { UserInterface } from "../modules/User/user.interface";
import { HydratedDocument } from "mongoose";


const roleRouter = Router()

roleRouter.post('/role', async (req, res, next) => {
   try {

      const admin: any = await RoleModel.create({
         value: Roles.DISPATCHER
      })

     const token = generateJWTToken(admin._id)

     const newUser = new UserDTO(admin)

      return res.status(200).json({
         message: 'Admin was created successfully',
         user: newUser,
         token
      })
   } 
   catch (e) {
      next(e)
   }
})



export default roleRouter;