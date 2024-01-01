import { Schema } from "mongoose";
import { Id } from "../../types/id.type";


export interface AlertConfigInterface extends Id{
   departmentId: Schema.Types.ObjectId
   crewIds: Schema.Types.ObjectId[]
   natureOfEmergencyIds: Schema.Types.ObjectId[]
   isHiddenEmergencyNotes: boolean
   isHiddenLocation: boolean
}