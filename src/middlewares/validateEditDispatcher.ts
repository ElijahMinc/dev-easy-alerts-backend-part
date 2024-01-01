import { body } from "express-validator";


export const validateEditDispetcher = [
   body('firstName').isLength({ min: 1 }),
   body('lastName').isLength({ min: 1 }),
   body('email').isEmail(),
]