import { AlertTypes, Roles } from "../../constants";
import { Id } from "../../types/id.type";


export interface UserInterface extends Id{
   alertFormId: Id;
   email: string;
   password: string;
   role: Roles
}