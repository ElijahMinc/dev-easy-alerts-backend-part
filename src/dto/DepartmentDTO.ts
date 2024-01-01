import { HydratedDocument, ObjectId, Schema, Types } from "mongoose";
import { UserInterface } from "../modules/User/user.interface";
import { Nullable } from "../types/global.interface";
import { CrewInterface } from "../modules/Crew/crew.interface";
import { DepartmentInterface } from "../modules/Department/department.interface";

export class DepartmentDTO {
   department: Nullable<CrewInterface> = null

   constructor(crew: HydratedDocument<DepartmentInterface & {_id: Schema.Types.ObjectId & Types.ObjectId}>){
      const {
         _id,
         title
      } = crew;
      
      this.department = {
         _id,
         title
      }
   }
}