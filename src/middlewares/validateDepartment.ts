import { body } from "express-validator";


export const validateDepartment = [
   body('title').isLength({ min: 1 }),
]