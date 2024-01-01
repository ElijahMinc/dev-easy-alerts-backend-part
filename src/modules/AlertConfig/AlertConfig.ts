import { model, Schema } from "mongoose";
import { AlertConfigInterface } from "./alertConfig.interface";

const AlertConfig = new Schema<Omit<AlertConfigInterface, '_id'>>({
   departmentId: { 
      type: Schema.Types.ObjectId,
      ref: "Department",
      default: null
   },
   crewIds: { 
      type:  [{
            type: Schema.Types.ObjectId,
            ref: 'Crew'
         }],
       default: []
   },
   natureOfEmergencyIds: { 
      type:  [{
            type: Schema.Types.ObjectId,
            ref: 'NatureOfEmergency'
         }],
       default: []
   },
   isHiddenEmergencyNotes: {
      type: Boolean,
      required: true,
      default: false
   },
   isHiddenLocation: {
      type: Boolean,
      default: false
   }
}, {
   timestamps: true
})

export default model('AlertConfig', AlertConfig);