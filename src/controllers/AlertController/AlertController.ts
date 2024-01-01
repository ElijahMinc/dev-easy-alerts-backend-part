import {  NextFunction, Response } from "express";
import  { alertService } from "../../services/AlertService";
import { AuthRequest } from "../../types/global.interface";
import { ApiError } from "../../services/ErrorService";
import { validationResult } from "express-validator";
import { AlertInterface } from "../../modules/Alert/alert.interface";
import { getDataWithoutNullable } from "../../utils/getDataWithoutNullable";

export class AlertController {

   createAlertUrl: string = '/alert'
   updateAlertByIdUrl: string = '/alert/:alertId'

   async updateAlertById(req: AuthRequest, res: Response, next: NextFunction) {
      try {

         const errors = validationResult(req)

         if(!errors.isEmpty()){
              return next(ApiError.BadRequest('Failed update', errors.array()))
         }

         const {  location, natureOfEmergencies, emergencyNotes, crews } = req.body

         const dataWithoutNullableValues = getDataWithoutNullable({  location, natureOfEmergencies, emergencyNotes,  crews }) as any
         const alertId = req.params.alertId as any

         if(!alertId){
            return next(ApiError.BadRequest('No alertId specified'))
         }

         const { data } = await alertService.updateAlertById({ ...dataWithoutNullableValues, _id: alertId })

         return res.status(200).json({
            message: 'You have successfully updated the alert',
            data
         })

      } 
      catch (e) {
         console.log('ERROR', e)
         next(e)
      }
   }

   async createAlert(req: AuthRequest, res: Response, next: NextFunction) {
      try {

         const errors = validationResult(req)

         if(!errors.isEmpty()){
              return next(ApiError.BadRequest('Failed create', errors.array()))
         }

        const { userId, departmentId, authorsFirstName, authorsLastName, authorsEmail, location, natureOfEmergencies, emergencyNotes, crews } = req.body as Omit<AlertInterface, '_id' | 'userRole'>

        const { data } = await alertService.createAlert({ userId, location, natureOfEmergencies, emergencyNotes, crews, departmentId, authorsFirstName, authorsLastName, authorsEmail, })


         return res.status(200).json({
            message: 'You have successfully created the alert',
            data: data.alert
         })

      } 
      catch (e) {
         console.log('ERROR', e)
         next(e)
      }
   }

}

export default new AlertController