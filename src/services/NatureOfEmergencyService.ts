import mongoose, { HydratedDocument, Schema } from "mongoose";
import Alert from "../modules/Alert/Alert";
import { AlertInterface } from "../modules/Alert/alert.interface";
import {  NatureOfEmergencyModel, UserModel } from "../modules";
import { UserInterface } from "../modules/User/user.interface";
import { Roles } from "../constants";
import { ApiError } from "./ErrorService";
import { tokenService } from "./TokenService";
import { UserDTO } from "../dto/UserDTO";
import { CrewInterface } from "../modules/Crew/crew.interface";
import { CrewModel } from "../modules/Crew";
import { CrewDTO } from "../dto/CrewDTO";
import { NatureOfEmergencyDTO } from "../dto/NatureOfEmergencyDTO";

class NatureOfEmergencyService {

   async createNatureOFEmergency(natureOfEmergencyData: Pick<CrewInterface, 'title' >){
      const { title } = natureOfEmergencyData

      const natureOfEmergency = await NatureOfEmergencyModel.findOne({ title  })

      if(!!natureOfEmergency){
         throw ApiError.BadRequest('There is such nature of emergency');
      }

      const newNatureOfEmergency = new NatureOfEmergencyModel({
         title
      }) as any

       await newNatureOfEmergency.save();

      const dtoNatureOfEmergency =  new NatureOfEmergencyDTO(newNatureOfEmergency)

      return { 
         data: { ...dtoNatureOfEmergency }

      }
   }

   async updateNatureOfEmergency(natureOfEmergencyData: Pick<CrewInterface, 'title' | '_id'>){
      const { title, _id } = natureOfEmergencyData

      const natureOfEmergency = await NatureOfEmergencyModel.findOne({ _id  })

      if(!natureOfEmergency){
         throw ApiError.BadRequest('There is no such crew');
      }

      const updatedNatureOfEmergency = await NatureOfEmergencyModel.findOneAndUpdate({ _id }, {
         title
      }) as any

       await updatedNatureOfEmergency.save();

       const updatedData = await NatureOfEmergencyModel.findOne({ _id  }) as any
      
       const dtoNatureOfEmergency = new NatureOfEmergencyDTO(updatedData);

      return { 
         data: { ...dtoNatureOfEmergency }

      }
   }

   async getAll(){
      const natureOfEmergencies = await NatureOfEmergencyModel.find()

      return { 
         data: natureOfEmergencies

      }
   }

}


const natureOfEmergencyService = new NatureOfEmergencyService()

export { natureOfEmergencyService }