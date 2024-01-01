import mongoose, { HydratedDocument, Schema } from "mongoose";
import Alert from "../modules/Alert/Alert";
import { AlertInterface } from "../modules/Alert/alert.interface";
import {  UserModel } from "../modules";
import { UserInterface } from "../modules/User/user.interface";
import { Roles } from "../constants";
import { ApiError } from "./ErrorService";
import { tokenService } from "./TokenService";
import { UserDTO } from "../dto/UserDTO";
import { CrewInterface } from "../modules/Crew/crew.interface";
import { CrewModel } from "../modules/Crew";
import { CrewDTO } from "../dto/CrewDTO";

class CrewService {

   async createCrew(crewData: Pick<CrewInterface, 'title' >){
      const { title } = crewData

      const crew = await CrewModel.findOne({ title  })

      if(!!crew){
         throw ApiError.BadRequest('There is such crew');
      }

      const newCrew = new CrewModel({
         title
      }) as any

       await newCrew.save();

      const dtoCrew =  new CrewDTO(newCrew)

      return { 
         data: { ...dtoCrew }

      }
   }

   async updateCrewById(crewData: Pick<CrewInterface, 'title' | '_id'>){
      const { title, _id } = crewData

      const crew = await CrewModel.findOne({ _id  })

      if(!crew){
         throw ApiError.BadRequest('There is no such crew');
      }

      const updatedCrew = await CrewModel.findOneAndUpdate({ _id }, {
         title
      }) as any

       await updatedCrew.save();

       const updatedData = await CrewModel.findOne({ _id  }) as any
      
       const dtoCrew = new CrewDTO(updatedData);

      return { 
         data: { ...dtoCrew }

      }
   }


   async getAll(){
      const crews = await CrewModel.find()

      return { 
         data: crews

      }
   }

}


const crewService = new CrewService()

export { crewService }