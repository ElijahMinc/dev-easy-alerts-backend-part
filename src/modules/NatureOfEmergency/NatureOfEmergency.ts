import { model, Schema } from "mongoose";
import { NatureOfEmergencyInterface } from "./natureOfEmergency.interface";

const NatureOfEmergency = new Schema<Omit<NatureOfEmergencyInterface, '_id' | 'createdAt' | 'updatedAt'>>({
   title: {
      type: String,
      required: true,
      default: ''
   }
}, {
   timestamps: true
})


export default model('NatureOfEmergency', NatureOfEmergency);