import bcrypt from 'bcrypt'
import crypto from 'crypto'
import jwt, { JwtPayload } from 'jsonwebtoken'
import { EXPIRES_TOKEN_TIME, SECRET_KEY, encryptionIV, key } from '../constants'

class TokenService {

   generateJWTToken(uniqueId: any): string {
      const expiresIn = EXPIRES_TOKEN_TIME
   
      const token = jwt.sign({ uniqueId }, SECRET_KEY, { expiresIn })
      return token
   }
   

   verifyJWTToken <T>(token: string): T | string | JwtPayload  {
     return jwt.verify(token, SECRET_KEY)
   }


   async generateHashPassword  (password: string): Promise<string>{
      const saltRounds = 6;
      const hashPassword = await bcrypt.hash(password, saltRounds)
      return hashPassword
   }

   verifyPassword (inputPassword: string, hashPassword: string) {
      return bcrypt.compareSync(inputPassword, hashPassword)
   }

   decryptPassword(encryptedPassword: string) {

      return new Promise((resolve, reject) => {
         try {
            const buff = Buffer.from(encryptedPassword, 'base64')
            const decipher = crypto.createDecipheriv(process.env.ECNRYPTION_CRYPTO_METHOD, key, encryptionIV)
            const result = decipher.update(buff.toString('utf8'), 'hex', 'utf8') +
            decipher.final('utf8') // Decrypts data and converts to utf8
            return resolve(result)
         } catch (error) {
            return reject(error)
         }
      })

   }

   async encryptPassword(password: string) {

      return new Promise((resolve, reject) => {

         try {
            const cipher = crypto.createCipheriv(process.env.ECNRYPTION_CRYPTO_METHOD, key, encryptionIV)
            const result =   Buffer.from(
              cipher.update(password, 'utf8', 'hex') + cipher.final('hex')
            ).toString('base64') // Encrypts data and converts to hex and base64

            return resolve(result);

         } catch (error) {
            reject(error)
         }
      })

   }

   async verifyCryptoPassword(inputPassword: string, encryptPassword: string) {

      return new Promise(async (resolve, reject) => {

         try {
            const decodedPassword = await this.decryptPassword(encryptPassword);

            return resolve(inputPassword === decodedPassword)
         } catch (error) {
            return reject(error)
         }
         
      })
   
   }
}

const tokenService = new TokenService()

export { tokenService }