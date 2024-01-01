import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ApiError } from "../../services/ErrorService";
import { crewService } from "../../services/CrewService";
import { getDataWithoutNullable } from "../../utils/getDataWithoutNullable";



export class CrewController {

   createCrewUrl: string = '/crew'
   getAllCrewsUrl: string = '/crew'
   updateCrewByIdUrl: string = '/crew/:crewId'
   deleteCrewByIdUrl: string = '/crew/:crewId'

   async createCrew(req: Request, res: Response, next: NextFunction) {
      try {

         const errors = validationResult(req)

         if(!errors.isEmpty()){
              return next(ApiError.BadRequest('Failed create', errors.array()))
         }

        const { title } = req.body
        const { data } = await crewService.createCrew({ title } )

         return res.status(200).json({
            message: 'You have successfully created a crew',
            data
         })

      } 
      catch (e) {
         console.log('ERROR', e)
         next(e)
      }
   }

   async updateCrewById(req: Request, res: Response, next: NextFunction) {
    try {
         const errors = validationResult(req)

         if(!errors.isEmpty()){
              return next(ApiError.BadRequest('Failed update', errors.array()))
         }

         const { title } = req.body

         const dataWithoutNullableValues = getDataWithoutNullable({ title }) as any
         const crewId = req.params.crewId as any

         if(!crewId){
            return next(ApiError.BadRequest('No crewId specified'))
         }

         const { data } = await crewService.updateCrewById({ _id: crewId, ...dataWithoutNullableValues })

         return res.status(200).json({
            message: 'You have successfully updated a crew',
            data
         })

      } 
      catch (e) {
         console.log('ERROR', e)
         next(e)
      }
   }

   async getAllCrews(req: Request, res: Response, next: NextFunction){
      try {
        const { data } = await crewService.getAll( )

         return res.status(200).json({
            message: 'You have successfully getting a crews',
            data
         })

      } 
      catch (e) {
         console.log('ERROR', e)
         next(e)
      }
   }

   async deleteCrew(req: Request, res: Response, next: NextFunction) {
   
   }

}

export default new CrewController