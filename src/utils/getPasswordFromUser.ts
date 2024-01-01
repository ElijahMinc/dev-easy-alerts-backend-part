import { HydratedDocument, Types } from "mongoose"
import { UserDTO } from "../dto/UserDTO"
import { UserInterface } from "../modules/User/user.interface"
import { tokenService } from "../services/TokenService"
import { Schema } from "mongoose"


 const getPasswordFromUser = async (user: HydratedDocument<UserInterface & {_id: Schema.Types.ObjectId & Types.ObjectId}>) => {
   const userDto = new UserDTO(user, {
      withPassword: true
   }).user

   return {...userDto, password: await tokenService.decryptPassword(userDto.password)}
 }

export const getPasswordFromUsers = async (users: UserInterface[]) => await Promise.all(users.map(getPasswordFromUser))