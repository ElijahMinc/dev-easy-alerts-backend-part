import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { accessByRole } from "../middlewares/accessByRole.middleware";
import { Roles } from "../constants";
import CrewController from "../controllers/CrewController/CrewController";
import { validateCrew } from "../middlewares/validateCrew";

const crewRouter = Router()

crewRouter.post(CrewController.createCrewUrl, authMiddleware, validateCrew, accessByRole([Roles.ADMIN]), CrewController.createCrew)
crewRouter.put(CrewController.updateCrewByIdUrl, authMiddleware, validateCrew, accessByRole([Roles.ADMIN]), CrewController.updateCrewById)
crewRouter.get(CrewController.getAllCrewsUrl, authMiddleware, accessByRole([Roles.ADMIN, Roles.DISPATCHER]), CrewController.getAllCrews)

export default crewRouter;