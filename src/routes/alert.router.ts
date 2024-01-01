import { Router } from "express";
import AlertController from "../controllers/AlertController/AlertController";
import authMiddleware from "../middlewares/auth.middleware";
import corsMiddleware from "../middlewares/cors.middleware";
import { validateCreateAlert, validateUpdateAlert } from "../middlewares/validateAlert";

const alertRouter = Router()


alertRouter.post(AlertController.createAlertUrl, authMiddleware, corsMiddleware, validateCreateAlert, AlertController.createAlert)
alertRouter.put(AlertController.updateAlertByIdUrl, authMiddleware, corsMiddleware, validateUpdateAlert, AlertController.updateAlertById)


export default alertRouter