import { model, Schema } from "mongoose";
import { DepartmentInterface } from "./department.interface";

const Department = new Schema<Omit<DepartmentInterface, '_id'>>({
   title: {
      type: String,
      unique: true,
      required: true,
   }
}, {
   timestamps: true
})

export default model('Department', Department);