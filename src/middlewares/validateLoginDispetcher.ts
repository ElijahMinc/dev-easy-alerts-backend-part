import { body } from "express-validator";


export const validateLoginDispetcher = [
   body('email').isEmail(),
   body('password').isLength({ min: 1, max: 20  }),
]