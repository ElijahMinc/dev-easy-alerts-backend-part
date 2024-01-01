import {  NextFunction, Response } from "express";
import { AuthRequest } from "../../types/global.interface";
import { ApiError } from "../../services/ErrorService";
import { validationResult } from "express-validator";
import { getDataWithoutNullable } from "../../utils/getDataWithoutNullable";
import { departmentService } from "../../services/DepartmentService";
import { alertConfigService } from "../../services/AlertConfigService";

export class DepartmentController {

   createDepartmentUrl: string = '/department'
   updateDepartmentByIdUrl: string = '/department/:departmentId'
   getAllDeparmentsUrl: string = '/department'
   getAllDeparmentByIdUrl: string = '/department/:departmentId'

   async updateDepartmentById(req: AuthRequest, res: Response, next: NextFunction) {
      try {
         const errors = validationResult(req)

         if(!errors.isEmpty()){
              return next(ApiError.BadRequest('Failed update', errors.array()))
         }

         const { title } = req.body

         const dataWithoutNullableValues = getDataWithoutNullable({ title }) as any
         const departmentId = req.params.departmentId as any

         if(!departmentId){
            return next(ApiError.BadRequest('No departmentId specified'))
         }

         const { data } = await departmentService.updateDepartmentById({ _id: departmentId, ...dataWithoutNullableValues })

         return res.status(200).json({
            message: 'You have successfully updated a department',
            data
         })

      } 
      catch (e) {
         console.log('ERROR', e)
         next(e)
      }
   }

   async createDepartment(req: AuthRequest, res: Response, next: NextFunction) {
      try {

         const errors = validationResult(req)

         if(!errors.isEmpty()){
              return next(ApiError.BadRequest('Failed create', errors.array()))
         }

        const { title } = req.body;

        const { data } = await departmentService.createDepartment({ title } )

        await alertConfigService.createAlertConfig({ departmentId: data._id });

         return res.status(200).json({
            message: 'You have successfully created a department',
            data
         })

      } 
      catch (e) {
         console.log('ERROR', e)
         next(e)
      }
   }

   async getAllDepartments(req: AuthRequest, res: Response, next: NextFunction){
      try {
        const { data } = await departmentService.getAll( )

         return res.status(200).json({
            message: 'You have successfully getting a departments',
            data
         })

      } 
      catch (e) {
         console.log('ERROR', e)
         next(e)
      }
   }

   async getDepartmentById(req: AuthRequest, res: Response, next: NextFunction) {
      try {

         const departmentId = req.params.departmentId as string;
         
         const { data } = await departmentService.findById(departmentId)

         return res.status(200).json({
            message: 'Successful getting department',
            data,
         })

      } 
      catch (e) {
         console.log('ERROR', e)
         next(e)
      }
   }

}

export default new DepartmentController()