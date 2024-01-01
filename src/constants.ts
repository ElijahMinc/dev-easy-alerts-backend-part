import crypto from 'crypto'

export const SECRET_KEY = process.env.JWT_SECRET_KEY

export enum AlertTypes  {
   FIRE = 'FIRE',
   GAS_LEAKAGE  = 'GAS_LEAKAGE'
}

export enum Roles {
   ADMIN = 'ADMIN',
   DISPATCHER = 'DISPATCHER',
}

export const encryptionIV = crypto
  .createHash('sha512')
  .update(process.env.SECRET_CRYPTO_IV)
  .digest('hex')
  .substring(0, 16)


export const key = crypto
   .createHash('sha512')
   .update(process.env.SECRET_CRYPTO_KEY)
   .digest('hex')
   .substring(0, 32)


export const EXPIRES_TOKEN_TIME = '9999 years' // or 8h