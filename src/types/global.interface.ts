import { Request } from "express";
import { UserInterface } from "../modules/User/user.interface";

export interface AuthRequest extends Request {
   user?: UserInterface
}

export interface PostQueryParams {
   $text: { $search: string, $diacriticSensitive: boolean }
   tags: {$in : string[]}
}


export type Nullable<T> = T | null