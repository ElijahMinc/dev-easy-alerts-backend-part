import { HydratedDocument, ObjectId, Schema, Types } from "mongoose";
import { UserInterface } from "../modules/User/user.interface";
import { Nullable } from "../types/global.interface";

export class UserDTO {
   user: Nullable<Partial<UserInterface>> = null

   constructor(user: HydratedDocument<UserInterface & {_id: Schema.Types.ObjectId & Types.ObjectId}>, options: {
      withPassword: boolean
   } = {
      withPassword: false
   }){
      const {
         firstName,
         lastName,
         email,
         _id,
         createdAt,
         updatedAt,
         role,
         departmentId,
         password
      } = user;
      
      if(options.withPassword){
         this.user = {
            firstName,
            lastName,
            email,
            _id,
            createdAt,
            updatedAt,
            role,
            departmentId,
            password
         }

         return;
      }

      this.user = {
         firstName,
         lastName,
         email,
         _id,
         createdAt,
         updatedAt,
         role,
         departmentId
      }
   }
}