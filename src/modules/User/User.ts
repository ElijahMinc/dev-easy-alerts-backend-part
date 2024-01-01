import { model, Schema } from "mongoose";
import { UserInterface } from "./user.interface";

const User = new Schema<Omit<UserInterface, '_id' | 'createdAt' | 'updatedAt'>>({
   firstName: {
      type: String,
      default: ''
   },
   lastName: {
      type: String,
      default: ''
   },
   role: {
      type: String,
      ref: 'Role',
      required: true,
      default: null,
   },
   email: {
      type: String,
      required: false,
      default: ''
   },
   password: {
      type: String,
      required: true,
      default: ''
   },
   departmentId: {
      type: Schema.Types.ObjectId,
      ref: "Department",
      default: null
   }
}, {
   timestamps: true
})

User.index({ firstName: 'text', lastName: 'text', email: "text"}, {default_language: 'none' })

export default model('User', User);