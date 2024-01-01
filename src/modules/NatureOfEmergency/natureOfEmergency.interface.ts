import { Schema } from "mongoose";
import { AlertTypes, Roles } from "../../constants";
import { Nullable } from "../../types/global.interface";
import { Id } from "../../types/id.type";


export interface NatureOfEmergencyInterface extends Id{
   title: string
}