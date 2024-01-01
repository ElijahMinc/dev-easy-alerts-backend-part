import mongoose, { HydratedDocument, isValidObjectId } from "mongoose";
import Alert from "../modules/Alert/Alert";
import { AlertInterface } from "../modules/Alert/alert.interface";
import { AlertDTO } from "../dto/AlertDTO";
import { ApiError } from "./ErrorService";
import { AlertModel } from "../modules";

export class AlertService {

   async createAlert(alertData: Omit<AlertInterface, '_id' | 'userRole' >){
      const { crews, userId, location, natureOfEmergencies, emergencyNotes, authorsEmail, authorsFirstName, authorsLastName, departmentId } = alertData

      const newAlert = new AlertModel({
         crews,
         userId,
         location,
         natureOfEmergencies,
         emergencyNotes,
         authorsEmail, 
         authorsFirstName, 
         authorsLastName, 
         departmentId
      }) as any

       await newAlert.save();

      const dtoAlert =  new AlertDTO(newAlert)

      return { 
         data: { ...dtoAlert }

      }
   }

   async updateAlertById(alertData: Omit<AlertInterface, ''>){
      const { _id, crews, location, natureOfEmergencies, emergencyNotes } = alertData

      const alert = await AlertModel.findOne({ _id  })

      if(!alert){
         throw ApiError.BadRequest('There is no such alert');
      }

      const updatedAlert = await AlertModel.findOneAndUpdate({ _id }, {
         crews, 
         location, 
         natureOfEmergencies, 
         emergencyNotes
      }) as any

       await updatedAlert.save();

       const updatedData = await AlertModel.findOne({ _id  }) as any
      
       const dtoAlert = new AlertDTO(updatedData);

      return { 
         data: { ...dtoAlert.alert }

      }
   }
}


const alertService = new AlertService()

export { alertService }