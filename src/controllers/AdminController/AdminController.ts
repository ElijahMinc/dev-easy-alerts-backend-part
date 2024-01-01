import { NextFunction, Request, Response } from "express";
import { generateJWTToken } from "../../utils/generateJWTToken";
import { validationResult } from "express-validator";
import { ApiError } from "../../services/ErrorService";
import {v4 as uuidV4} from 'uuid'
import { verifyPassword } from "../../utils/verifyPassword";
import { generateHashPassword } from "../../utils/genereateHashPassword";
import { userService } from "../../services/UserService";
import { Roles } from "../../constants";
import { UserDTO } from "../../dto/UserDTO";
import { UserModel } from "../../modules";
import { tokenService } from "../../services/TokenService";
import { AuthRequest } from "../../types/global.interface";


export class AdminController {
   loginUrl: string = '/auth/admin/login'
   registerUrl: string = '/auth/admin/register'
   checkAuthUrl: string = '/auth/admin/check-auth'



   createFormByDispetcherIdUrl: string = '/auth/admin/dispetcher-form'
   updateFormByDispetcherIdUrl: string = '/auth/admin/dispetcher-form'



   async checkAuth(req: AuthRequest, res: Response, next: NextFunction){
    try {
      

      return res.json({
       message: 'Checked auth admin',
       data: req.user

      })
    } catch (error) {
      console.log('ERROR', error)
      next(error)
    }
   }

   async login(req: Request, res: Response, next: NextFunction) {
      try {
         const { password } = req.body

         const admin = await userService.findByRole(Roles.ADMIN)

         if(!admin){
            return next(ApiError.BadRequest('There is no such administrator'))
         }

         const validPassword = await tokenService.verifyCryptoPassword(password, admin.password)
         
         if(!validPassword){
            return next(ApiError.BadRequest('Wrong password'))
         }

         const token = generateJWTToken(admin)

         const adminWithoutPassword = new UserDTO(admin)

         return res.status(200).json({
            message: 'You were authorized',
            data: adminWithoutPassword,
            accessToken: token
         })

      } 
      catch (e) {
         console.log('ERROR', e)
         next(e)
      }
   }

   async updateFormByDispetcherId(req: Request, res: Response, next: NextFunction) {
   
   }
   async createFormByDispetcherId(req: Request, res: Response, next: NextFunction) {
   
   }

   async register(req: Request, res: Response, next: NextFunction) {
      try {

         const { password } = req.body

         const admin = await userService.findByRole(Roles.ADMIN)

         if(!!admin){
            return next(ApiError.BadRequest('There is such admin'));
         }

         const encryptPassword = await tokenService.encryptPassword(password)

         const newAdmin = new UserModel({
            password: encryptPassword,
            role: Roles.ADMIN,
            isHiddenNatureOfEmergency: true, 
            isHiddenOtherInformation: true, 
            isHiddenLocation: true,
         }) as any

         const token = generateJWTToken(newAdmin)

          await newAdmin.save()


         return res.status(200).json({
            message: 'You have successfully created a admin',
            user: new UserDTO(newAdmin),
            token
         })

      } 
      catch (e) {
         console.log('ERROR', e)
         next(e)
      }
   }
}

export default new AdminController