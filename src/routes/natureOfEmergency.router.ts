import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { accessByRole } from "../middlewares/accessByRole.middleware";
import { Roles } from "../constants";
import { validateCrew } from "../middlewares/validateCrew";
import NatureOfEmergencyController from "../controllers/NatureOfEmergencyController/NatureOfEmergencyController";

const natureOfEmergencyRouter = Router()

natureOfEmergencyRouter.post(NatureOfEmergencyController.createNatureOfEmergencyUrl, authMiddleware, validateCrew, accessByRole([Roles.ADMIN]), NatureOfEmergencyController.createNatureOfEmergency)
natureOfEmergencyRouter.put(NatureOfEmergencyController.updateNatureOfEmergencyByIdUrl, authMiddleware, validateCrew, accessByRole([Roles.ADMIN]), NatureOfEmergencyController.updateNatureOfEmergencyById)
natureOfEmergencyRouter.get(NatureOfEmergencyController.getAllNatureOfEmergencyUrl, authMiddleware, accessByRole([Roles.ADMIN, Roles.DISPATCHER]), NatureOfEmergencyController.getAllNatureOfEmergencies)

export default natureOfEmergencyRouter;