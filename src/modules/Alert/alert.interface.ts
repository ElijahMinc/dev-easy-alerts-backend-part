import { Schema } from "mongoose";
import { AlertTypes } from "../../constants";
import { Id } from "../../types/id.type";




export interface AlertInterface extends Id{
   departmentId: Schema.Types.ObjectId
   userId: Schema.Types.ObjectId
   authorsFirstName: string
   authorsLastName: string
   authorsEmail: string
   userRole: Schema.Types.ObjectId
   crews: {
     title: string
     _id: Schema.Types.ObjectId
   }[]
   natureOfEmergencies: {
      title: AlertTypes
      _id: Schema.Types.ObjectId
      ref: 'Crew';
    }[]
   location: string
   emergencyNotes: string
}