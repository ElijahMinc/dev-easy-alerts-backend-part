import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "../../services/ErrorService";
import { crewService } from "../../services/CrewService";
import { getDataWithoutNullable } from "../../utils/getDataWithoutNullable";
import { natureOfEmergencyService } from "../../services/NatureOfEmergencyService";



export class NatureOfEmergencyController {

   createNatureOfEmergencyUrl: string = '/nature-of-emergency'
   getAllNatureOfEmergencyUrl: string = '/nature-of-emergency'
   updateNatureOfEmergencyByIdUrl: string = '/nature-of-emergency/:natureOfEmergencyId'
   deleteNatureOfEmergencyyIdUrl: string = '/nature-of-emergency/:natureOfEmergencyId'

   async createNatureOfEmergency(req: Request, res: Response, next: NextFunction) {
      try {

         const errors = validationResult(req)

         if(!errors.isEmpty()){
              return next(ApiError.BadRequest('Failed create', errors.array()))
         }

        const { title } = req.body

        const { data } = await natureOfEmergencyService.createNatureOFEmergency({ title } )


         return res.status(200).json({
            message: 'You have successfully created a nature of emergency',
            data
         })

      } 
      catch (e) {
         console.log('ERROR', e)
         next(e)
      }
   }

   async updateNatureOfEmergencyById(req: Request, res: Response, next: NextFunction) {
    try {
         const errors = validationResult(req)

         if(!errors.isEmpty()){
              return next(ApiError.BadRequest('Failed update', errors.array()))
         }

         const { title } = req.body

         const dataWithoutNullableValues = getDataWithoutNullable({ title }) as any
         const natureOfEmergencyId = req.params.natureOfEmergencyId as any

         if(!natureOfEmergencyId){
            return next(ApiError.BadRequest('No crewId specified'))
         }

         const { data } = await natureOfEmergencyService.updateNatureOfEmergency({ _id: natureOfEmergencyId, ...dataWithoutNullableValues })

         return res.status(200).json({
            message: 'You have successfully updated a nature of Emergency',
            data
         })

      } 
      catch (e) {
         console.log('ERROR', e)
         next(e)
      }
   }

   async deleteNatureOfEmergency(req: Request, res: Response, next: NextFunction) {
   
   }

   async getAllNatureOfEmergencies(req: Request, res: Response, next: NextFunction){
      try {
        const { data } = await natureOfEmergencyService.getAll( )

         return res.status(200).json({
            message: 'You have successfully getting a nature of emergencies',
            data
         })

      } 
      catch (e) {
         console.log('ERROR', e)
         next(e)
      }
   }

}

export default new NatureOfEmergencyController