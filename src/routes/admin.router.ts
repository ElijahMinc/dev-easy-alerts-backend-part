import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import AdminController from "../controllers/AdminController/AdminController";
import { accessByRole } from "../middlewares/accessByRole.middleware";
import { Roles } from "../constants";

const adminRouter = Router()

adminRouter.post(AdminController.loginUrl, AdminController.login)
adminRouter.post(AdminController.registerUrl, AdminController.register)

adminRouter.get(AdminController.checkAuthUrl, authMiddleware, AdminController.checkAuth)

adminRouter.post(AdminController.createFormByDispetcherIdUrl, authMiddleware,  accessByRole([Roles.ADMIN]), AdminController.createFormByDispetcherId)
adminRouter.put(AdminController.updateFormByDispetcherIdUrl, authMiddleware,  accessByRole([Roles.ADMIN]), AdminController.updateFormByDispetcherId)



export default adminRouter;