import { model, Schema } from "mongoose";
import { AlertInterface } from "./alert.interface";

const Alert = new Schema<Omit<AlertInterface, '_id'>>({
   userId: { 
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true
   },
   departmentId: { 
      type: Schema.Types.ObjectId,
      required: true
   },
   authorsFirstName: {
      type: String,
      required: true
   },
   authorsLastName: {
      type: String,
      required: true
   },
   authorsEmail: {
      type: String,
      required: true
   },
   crews: {
      type:  [
         {
           title: String,
           _id: {
             type: Schema.Types.ObjectId,
             ref: 'Crew',
           },
         },
       ],
       default: []
   },
   natureOfEmergencies: {
      type:  [
         {
           title: String,
           _id: {
             type: Schema.Types.ObjectId,
             ref: 'NatureOfEmergency',
           },
         },
       ],
       default: []
   },
   location: {
      type: String,
      default: ''
   },
   emergencyNotes: {
      type: String,
      default: ''
   },
}, {
   timestamps: true
})

export default model('Alert', Alert);