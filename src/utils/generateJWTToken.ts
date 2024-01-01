import jwt from 'jsonwebtoken'
import { SECRET_KEY } from '../constants'
import { ObjectId, Types } from 'mongoose'

export const generateJWTToken = (uniqueId: any): string => {
   const expiresIn = '8h'

   const token = jwt.sign({ uniqueId }, SECRET_KEY, { expiresIn })
   return token
}

