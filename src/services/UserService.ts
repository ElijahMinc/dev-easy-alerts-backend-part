import mongoose, { HydratedDocument, Schema } from "mongoose";
import Alert from "../modules/Alert/Alert";
import { AlertInterface } from "../modules/Alert/alert.interface";
import {  UserModel } from "../modules";
import { UserInterface } from "../modules/User/user.interface";
import { Roles } from "../constants";
import { ApiError } from "./ErrorService";
import { tokenService } from "./TokenService";
import { UserDTO } from "../dto/UserDTO";
import { getDataWithoutNullable } from "../utils/getDataWithoutNullable";
import {  getPasswordFromUsers } from "../utils/getPasswordFromUser";


type PickedUpdateDispatcher = 'firstName' | 'lastName' | 'email' | 'password'

class UserService {

   async deleteDispatcherById(dispatcherId: UserInterface['_id']){

      const dispatcher = await UserModel.findOneAndDelete({ _id: dispatcherId  })

      if(!dispatcher){
         throw ApiError.BadRequest('There is no such dispatcher');
      }

      return { 
         data: null

      }
   }

   async createDispatcher(dispatcherData: Pick<UserInterface, 'firstName' | 'lastName' | 'email' | 'password' | 'departmentId'>){
      const { email, firstName, lastName, password, departmentId} = dispatcherData

      if(!departmentId){
         throw ApiError.BadRequest('There is no department for this dispatcher');
      }

      const dispatcher = await UserModel.findOne({ email  })

      if(!!dispatcher){
         throw ApiError.BadRequest('There is such dispatcher');
      }

      const encryptedPassword = await tokenService.encryptPassword(password)

      const newDispatcher = new UserModel({
         firstName,
         lastName,
         departmentId,
         email,
         password: encryptedPassword,
         role: Roles.DISPATCHER
      }) as any

       await newDispatcher.save();

      const dtoUser =  new UserDTO(newDispatcher)

      return { 
         data: { ...dtoUser }

      }
   }

  async updateDispatcherById(dispatcherData: Pick<UserInterface, PickedUpdateDispatcher> & Pick<UserInterface, 'departmentId'> & { _id: string }) {
      const { email, firstName, lastName, departmentId, _id } = dispatcherData

      const dispatcher = await UserModel.findOne({ _id  })

      if(!dispatcher){
         throw ApiError.BadRequest('There is no such dispatcher')
      }

      const updatedDispatcher = await UserModel.findOneAndUpdate({ _id }, {
         firstName,
         lastName,
         departmentId,
         email,
         role: Roles.DISPATCHER,
      }) as any

       await updatedDispatcher.save()

       
      const updatedUser = await UserModel.findOne({ _id  }) as any
      
      const dtoUser = new UserDTO(updatedUser);

      return {
         data: dtoUser
      }
  }

   async login({ email, password }: Pick<UserInterface, 'email' | 'password'>){

      const user = await UserModel.findOne({ email  })

      if(!user){
         throw ApiError.BadRequest('This user does not exist')
      }

      const validPassword = await tokenService.verifyCryptoPassword(password, user.password)
      
      if(!validPassword){
         throw ApiError.BadRequest('Wrong credentials')
      }

      const dtoUser = new UserDTO(user as any)

      const token = tokenService.generateJWTToken(dtoUser.user)

      return {
         token,
         data: user
      }
   }

   async getAll(){
      const users = await UserModel.find()
      return users
   }

   async findById(userId: UserInterface['email']): Promise<any> {
      
      const mongoDbObjectId = new mongoose.Types.ObjectId(userId);

      const user = await UserModel.findOne({ _id: mongoDbObjectId  })

      if(!user){
         throw ApiError.BadRequest('There is no such user')
      };

      return {
         data: user
      }
   }

   async findByRole(role: Roles): Promise<any> {
      const user = await UserModel.findOne({ role  })
      return user
   }

   async find({search, page = 1, perPage = 10}: { search: string, page: number | string, perPage:  number | string}): Promise<any> {
      const searchRegex = new RegExp(search, 'i');

      // const skip = Number(page) * Number(perPage);

      const searchQuery = !!search ? {
         $or: [
           { firstName: { $regex: searchRegex } },
           { lastName: { $regex: searchRegex } },
           { email: { $regex: searchRegex } }
         ],
         role: { $ne: 'ADMIN' }
       } : {
         role: { $ne: 'ADMIN' }
       };


      const query = UserModel.find(searchQuery,
         {
            
         },
         {

            limit: +perPage,
            skip: (+page - 1) * (+perPage),
         }
        )
        .select('+password')

      const countQuery = UserModel.countDocuments(searchQuery);


      const [users, total] = await Promise.all([query, countQuery])
      
      const usersWithoutAdminRole = (users as any[])
         .filter( (user) => user.role !== Roles.ADMIN)

      const usersWithPassword = await getPasswordFromUsers(usersWithoutAdminRole)

      if(!users){
         return { data: usersWithPassword, total, page, perPage }
      }
      return { data: usersWithPassword, total, page, perPage, }
   }

   async create(dispetcher: UserInterface){
      return await UserModel.create(dispetcher)
   }

   async update(dispetcher: UserInterface){
      return await UserModel.updateOne(dispetcher)
   }

   async delete(dispatcherId: UserInterface){
      return await UserModel.deleteOne({ _id: dispatcherId })
   }
}


const userService = new UserService()

export { userService }