import { HydratedDocument, ObjectId, Schema, Types } from "mongoose";
import { UserInterface } from "../modules/User/user.interface";
import { Nullable } from "../types/global.interface";
import { CrewInterface } from "../modules/Crew/crew.interface";

export class CrewDTO {
   crew: Nullable<CrewInterface> = null

   constructor(crew: HydratedDocument<CrewInterface & {_id: Schema.Types.ObjectId & Types.ObjectId}>){
      const {
         _id,
         title
      } = crew;
      
      this.crew = {
         _id,
         title
      }
   }
}