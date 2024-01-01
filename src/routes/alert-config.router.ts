import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import corsMiddleware from "../middlewares/cors.middleware";
import AlertConfigController from "../controllers/AlertConfigController/AlertConfigController";
import { accessByRole } from "../middlewares/accessByRole.middleware";
import { Roles } from "../constants";

const alertConfigRouter = Router()


alertConfigRouter.put(
   AlertConfigController.updateAlertConfigByDepartmentIdUrl, 
   authMiddleware, 
   accessByRole([Roles.ADMIN]), 
   AlertConfigController.updateAlertConfigByDepartmentId
)

alertConfigRouter.get(
   AlertConfigController.getAlertConfigByDepartmentIdUrl, 
   authMiddleware, 
   accessByRole([Roles.ADMIN, Roles.DISPATCHER]), 
   AlertConfigController.getAlertConfigByDepartmentId
)

export default alertConfigRouter