import bcrypt from 'bcrypt'

export const generateHash = async (password: string): Promise<string> => {
   const saltRounds = 6;
   const hash = await bcrypt.hash(password, saltRounds)
   return hash
}