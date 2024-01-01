import { Schema } from "mongoose";
import { AlertTypes, Roles } from "../../constants";
import { Nullable } from "../../types/global.interface";
import { Id } from "../../types/id.type";


export interface UserInterface extends Id{
   firstName: string
   lastName: string
   email: string;
   password: string;
   role: string;
   createdAt: Date;
   updatedAt: Date;
   departmentId: Schema.Types.ObjectId
}