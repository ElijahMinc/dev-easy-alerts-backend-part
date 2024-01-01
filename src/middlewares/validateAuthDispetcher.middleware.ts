import { body } from "express-validator";


export const validateAuthDispetcher = [
   body('firstName').isLength({ min: 1 }),
   body('lastName').isLength({ min: 1 }),
   body('email').isEmail(),
   body('password').isLength({ min: 1, max: 20  }),
   body('departmentId').isString().isLength({ min: 1 })
]