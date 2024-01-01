import { HydratedDocument, Schema, Types } from "mongoose";
import { Nullable } from "../types/global.interface";
import { CrewInterface } from "../modules/Crew/crew.interface";
import { AlertInterface } from "../modules/Alert/alert.interface";

export class AlertDTO {
   alert: Nullable<AlertInterface> = null

   constructor(crew: HydratedDocument<AlertInterface & {_id: Schema.Types.ObjectId & Types.ObjectId}>){
      const {
         _id,
         userId,
         crews,
         natureOfEmergencies,
         location,
         userRole,
         emergencyNotes,
         departmentId,
         authorsFirstName,
         authorsLastName,
         authorsEmail
      } = crew;
      
      this.alert = {
         _id,
         userId,
         userRole,
         crews,
         natureOfEmergencies,
         location,
         emergencyNotes,
         departmentId,
         authorsFirstName,
         authorsLastName,
         authorsEmail
      }
   }
}