import jwt, { JwtPayload } from "jsonwebtoken"
import { SECRET_KEY } from "../constants"

export const verifyJWTToken = <T>(token: string): T | string | JwtPayload => jwt.verify(token, SECRET_KEY)
