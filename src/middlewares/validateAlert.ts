import { body } from "express-validator";


export const validateCreateAlert = [
   body('userId').isString(),
   body('departmentId').isString(),
   body('authorsFirstName').isString(),
   body('authorsLastName').isString(),
   body('authorsEmail').isString(),
   body('crews').isArray(),
   body('natureOfEmergencies').isArray(),
   body('emergencyNotes').isString(),
   body('location').isString(),
]

export const validateUpdateAlert = [
   body('crews').isArray(),
   body('natureOfEmergencies').isArray(),
   body('emergencyNotes').isString(),
   body('location').isString(),
]