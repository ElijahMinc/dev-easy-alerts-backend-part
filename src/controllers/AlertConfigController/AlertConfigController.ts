import {  NextFunction, Request, Response } from "express";
import  { alertService } from "../../services/AlertService";
import { AuthRequest } from "../../types/global.interface";
import { ApiError } from "../../services/ErrorService";
import { validationResult } from "express-validator";
import { getDataWithoutNullable } from "../../utils/getDataWithoutNullable";
import { alertConfigService } from "../../services/AlertConfigService";
import { UserInterface } from "../../modules/User/user.interface";

export class AlertConfigController {

   updateAlertConfigByDepartmentIdUrl: string = '/alert-config/:departmentId'
   getAlertConfigByDepartmentIdUrl: string = '/alert-config/:departmentId'

   async updateAlertConfigByDepartmentId(req: AuthRequest, res: Response, next: NextFunction) {
      try {

         const errors = validationResult(req)

         if(!errors.isEmpty()){
              return next(ApiError.BadRequest('Failed update', errors.array()))
         }

         const { crewIds, natureOfEmergencyIds, isHiddenLocation, isHiddenNatureOfEmergency, isHiddenOtherInformation } = req.body
         const dataWithoutNullableValues = getDataWithoutNullable({ crewIds, isHiddenLocation, isHiddenNatureOfEmergency, isHiddenOtherInformation, natureOfEmergencyIds }) as any

         const departmentIdFromParams = req.params.departmentId as any

         if(!departmentIdFromParams){
            return next(ApiError.BadRequest('No departmentId specified'))
         }

         const { data } = await alertConfigService.updateAlertConfigById({ ...dataWithoutNullableValues, departmentId: departmentIdFromParams })

         return res.status(200).json({
            message: 'You have successfully updated a alert configuration by dispatcher id',
            data: data.alertConfig
         })

      } 
      catch (e) {
         console.log('ERROR', e)
         next(e)
      }
   }

   async getAlertConfigByDepartmentId(req: Request, res: Response, next: NextFunction) {
      try {

         const { departmentId } = req.params as any

         const { data } = await alertConfigService.getAlertConfigByDepartmentId(departmentId)

         return res.status(200).json({
            message: 'Successful alert config search',
            data: data.alertConfig
         })

      } 
      catch (e) {
         console.log('ERROR', e)
         next(e)
      }
   }
}

export default new AlertConfigController