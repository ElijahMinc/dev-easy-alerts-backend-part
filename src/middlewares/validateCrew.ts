import { body } from "express-validator";


export const validateCrew = [
   body('title').isLength({ min: 1 }),
]