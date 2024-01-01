import { HydratedDocument, Schema, Types } from "mongoose";
import { Nullable } from "../types/global.interface";
import { AlertConfigInterface } from "../modules/AlertConfig/alertConfig.interface";

export class AlertConfigDTO {
   alertConfig: Nullable<AlertConfigInterface> = null

   constructor(crew: HydratedDocument<AlertConfigInterface & {_id: Schema.Types.ObjectId & Types.ObjectId}>){
      const {
         _id,
         departmentId,
         crewIds,
         isHiddenLocation,
         isHiddenEmergencyNotes,
         natureOfEmergencyIds
      } = crew;
      
      this.alertConfig = {
         _id,
         departmentId,
         crewIds,
         isHiddenLocation,
         isHiddenEmergencyNotes,
         natureOfEmergencyIds
      }
   }
}