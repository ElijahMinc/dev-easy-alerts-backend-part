import { model, Schema } from "mongoose";
import { CrewInterface } from "./crew.interface";

const Crew = new Schema<Omit<CrewInterface, '_id' | 'createdAt' | 'updatedAt'>>({
   title: {
      type: String,
      required: true,
      default: ''
   }
}, {
   timestamps: true
})


export default model('Crew', Crew);