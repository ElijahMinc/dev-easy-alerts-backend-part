import { UserDTO } from './../../dto/UserDTO';
import { NextFunction, Request, Response } from "express";
import { generateJWTToken } from "../../utils/generateJWTToken";
import { validationResult } from "express-validator";
import { ApiError } from "../../services/ErrorService";
import {v4 as uuidV4} from 'uuid'
import { verifyPassword } from "../../utils/verifyPassword";
import { generateHashPassword } from "../../utils/genereateHashPassword";
import { userService } from "../../services/UserService";
import User from "../../modules/User/User";
import { UserModel } from "../../modules";
import { Roles } from '../../constants';
import { Schema } from 'mongoose';
import { getDataWithoutNullable } from '../../utils/getDataWithoutNullable';
import { alertConfigService } from '../../services/AlertConfigService';
import { AuthRequest } from '../../types/global.interface';


export class UserController {
   loginUrl: string = '/user/login'
   registerUrl: string = '/user/register'
   checkAuthUrl: string = '/user/check-auth'

   getDispatcherUrl: string = '/user/dispatcher'
   getDispatcherByIdUrl: string = '/user/dispatcher/:dispatcherId'
   createDispatcherUrl: string = '/user/dispatcher'
   updateDispatcherByIdUrl: string = '/user/dispatcher/:dispatcherId'
   deleteDispatcherByIdUrl: string = '/user/dispatcher/:dispatcherId'

   createCrewUrl: string = '/user/crew'
   updateCrewUrl: string = '/user/crew'

   async checkAuth(req: AuthRequest, res: Response, next: NextFunction){
      try {
         return res.status(200).json({
            message: 'Your authorization was success',
            data: req.user
         })

      } 
      catch (e) {
         console.log('ERROR', e)
         next(e)
      }
   }

   async login(req: Request, res: Response, next: NextFunction) {
      try {
         const errors = validationResult(req)

         if(!errors.isEmpty()){
              return next(ApiError.BadRequest('Failed authorization', errors.array()))
         }

         const {  email, password } = req.body

         const { data, token } = await userService.login({email, password})


         return res.status(200).json({
            message: 'Athorization was successfully',
            data,
            accessToken: token
         })

      } 
      catch (e) {
         console.log('ERROR', e)
         next(e)
      }
   }

   async deleteDispatcherById(req: Request, res: Response, next: NextFunction) {
      try {

         const dispatcherId = req.params.dispatcherId as any

         if(!dispatcherId){
            return next(ApiError.BadRequest('No dispatcherId specified'))
         }

         const { data } = await userService.deleteDispatcherById(dispatcherId);
         
         await alertConfigService.deleteAlertConfigByUserId(dispatcherId);

         return res.status(200).json({
            message: 'You have successfully delete a dispatcher',
            data
         })

      } 
      catch (e) {
         console.log('ERROR', e)
         next(e)
      }
   }

   async updateDispatcherById(req: Request, res: Response, next: NextFunction) {
      try {

         const errors = validationResult(req)

         if(!errors.isEmpty()){
              return next(ApiError.BadRequest('Failed update', errors.array()))
         }

         const { firstName, lastName, email, departmentId } = req.body

         const dataWithoutNullableValues = getDataWithoutNullable({ firstName, lastName, email, departmentId}) as any
         const dispatcherId = req.params.dispatcherId as any

         if(!dispatcherId){
            return next(ApiError.BadRequest('No dispatcherId specified'))
         }

         const { data } = await userService.updateDispatcherById({ ...dataWithoutNullableValues, _id: dispatcherId })

         return res.status(200).json({
            message: 'You have successfully updated a dispatcher',
            data
         })

      } 
      catch (e) {
         console.log('ERROR', e)
         next(e)
      }
   }

   async createDispatcher(req: Request, res: Response, next: NextFunction) {
      try {

         const errors = validationResult(req)

         if (!errors.isEmpty()){
               return next(ApiError.BadRequest('Failed create', errors.array()))
         }

        const { firstName, lastName, email, password, departmentId } = req.body

        const { data: createdUserData } = await userService.createDispatcher({ firstName, lastName, email, password, departmentId }) as any

        let userData =  createdUserData as any

         // const { data: createdAlertData } = await alertConfigService.createAlertConfig({ userId: userData.user._id });

         // userData = await userService.updateDispatcherById({ firstName, lastName, email, password, _id: createdUserData.user._id, departmentId: createdAlertData.alertConfig._id }) as any
        
         return res.status(200).json({
            message: 'You have successfully created a dispatcher',
            data: userData
         })

      } 
      catch (e) {
         console.log('ERROR', e)
         next(e)
      }
   }

   async getAll(req: Request, res: Response, next: NextFunction) {
      try {

         const { search, page, perPage } = req.query as { search: string, page: string | number, perPage: string | number }
         const { data, total, page: currentPage, perPage: currentPerPage, totalPages  } = await userService.find({ search, page, perPage })

         return res.status(200).json({
            message: 'Successful user search',
            data,
            total, 
            page: +currentPage, 
            perPage: +currentPerPage,
            totalPages
         })

      } 
      catch (e) {
         console.log('ERROR', e)
         next(e)
      }
   }

   async getUserById(req: Request, res: Response, next: NextFunction) {
      try {

         const dispatcherId = req.params.dispatcherId as string;

         const { data } = await userService.findById(dispatcherId)

         return res.status(200).json({
            message: 'Successful getting user',
            data,
         })

      } 
      catch (e) {
         console.log('ERROR', e)
         next(e)
      }
   }

}

export default new UserController