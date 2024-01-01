import mongoose, { HydratedDocument, isValidObjectId, mongo } from "mongoose";
import Alert from "../modules/Alert/Alert";
import { AlertInterface } from "../modules/Alert/alert.interface";
import { AlertDTO } from "../dto/AlertDTO";
import { ApiError } from "./ErrorService";
import { AlertConfigInterface } from "../modules/AlertConfig/alertConfig.interface";
import { AlertConfigModel } from "../modules/AlertConfig";
import { AlertConfigDTO } from "../dto/AlertConfigDTO";
import { UserInterface } from "../modules/User/user.interface";
import { DepartmentInterface } from "../modules/Department/department.interface";

export class AlertConfigService {

   async createAlertConfig(alertData: Partial<AlertConfigInterface>){
      const { crewIds, departmentId, isHiddenLocation, isHiddenEmergencyNotes, natureOfEmergencyIds } = alertData

      const newAlertConfig = new AlertConfigModel({
         crewIds,
         departmentId,
         isHiddenLocation, 
         isHiddenEmergencyNotes,
         natureOfEmergencyIds
      }) as any

       await newAlertConfig.save();

      const dtoAlertConfig =  new AlertConfigDTO(newAlertConfig)

      return { 
         data: { ...dtoAlertConfig }

      }
   }

   async deleteAlertConfigByUserId(userId: string){
      const validUserId = new mongoose.Types.ObjectId(userId);

      return await AlertConfigModel.deleteOne({ userId: validUserId })
   }

   async updateAlertConfigById(alertConfigData: AlertConfigInterface){
      const { crewIds, departmentId, isHiddenLocation, isHiddenEmergencyNotes, natureOfEmergencyIds } = alertConfigData

      let isObjectMongoId = mongoose.isValidObjectId(departmentId);

      if(!isObjectMongoId){
         throw ApiError.BadRequest(`${departmentId} is not Object Id`)
      }

      const strDepartmentId = departmentId as unknown

      const validDepartmentId = new mongoose.Types.ObjectId(strDepartmentId as mongoose.Types.ObjectId)

      const alertConfigByDispatcherId = await AlertConfigModel.findOne({ departmentId: validDepartmentId })

      if(!alertConfigByDispatcherId){
         throw ApiError.BadRequest('There is no such alertConfig');
      }

      const updatedAlertConfig = await AlertConfigModel.findOneAndUpdate({ departmentId: validDepartmentId }, {
         crewIds,
         natureOfEmergencyIds,

         isHiddenLocation, 
         isHiddenEmergencyNotes,
      }) as any

       await updatedAlertConfig.save();

       const updatedData = await AlertConfigModel.findOne({ departmentId  }) as any
      
       const dtoAlertConfig = new AlertConfigDTO(updatedData);

      return { 
         data: { ...dtoAlertConfig }

      }
   }

   async getAlertConfigByDepartmentId(departmentId: DepartmentInterface['_id']){

      const alertConfigByDispatcherId = await AlertConfigModel.findOne({ departmentId }) as any

      if(!alertConfigByDispatcherId){
         throw ApiError.BadRequest('There is no such alertConfig');
      }
      
       const dtoAlertConfig = new AlertConfigDTO(alertConfigByDispatcherId);

      return { 
         data: { ...dtoAlertConfig }

      }
   }
}


const alertConfigService = new AlertConfigService()

export { alertConfigService }