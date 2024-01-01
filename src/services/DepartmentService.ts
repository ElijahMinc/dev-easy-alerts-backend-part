import {  DepartmentModel } from "../modules";
import { ApiError } from "./ErrorService";
import { CrewInterface } from "../modules/Crew/crew.interface";
import { CrewModel } from "../modules/Crew";
import Department from "../modules/Department/Department";
import { DepartmentDTO } from "../dto/DepartmentDTO";
import { DepartmentInterface } from "../modules/Department/department.interface";
import mongoose from "mongoose";

class DepartmentService {

   async createDepartment(crewData: Pick<CrewInterface, 'title' >){
      const { title } = crewData

      const crew = await CrewModel.findOne({ title  })

      if(!!crew){
         throw ApiError.BadRequest('There is such crew');
      }

      const newCrew = new DepartmentModel({
         title
      }) as any

       await newCrew.save();

      const dtoDepartment =  new DepartmentDTO(newCrew)

      return { 
         data: { ...dtoDepartment.department }

      }
   }

   async updateDepartmentById(crewData: Pick<CrewInterface, 'title' | '_id'>){
      const { title, _id } = crewData

      const department = await Department.findOne({ _id  })

      if(!department){
         throw ApiError.BadRequest('There is no such department');
      }

      const updatedDepartment = await Department.findOneAndUpdate({ _id }, {
         title
      }) as any

       await updatedDepartment.save();

       const updatedData = await Department.findOne({ _id  }) as any
      
       const dtoDepartment = new DepartmentDTO(updatedData);

      return { 
         data: { ...dtoDepartment.department }

      }
   }

   async findById(departmentId: string): Promise<any> {
      
      const mongoDbObjectId = new mongoose.Types.ObjectId(departmentId);

      const department = await DepartmentModel.findOne({ _id: mongoDbObjectId  })

      if(!department){
         throw ApiError.BadRequest('There is no such user')
      };

      return {
         data: department
      }
   }
   

   async getAll(){
      const departments = await Department.find()

      return { 
         data: departments

      }
   }

}


const departmentService = new DepartmentService()

export { departmentService }