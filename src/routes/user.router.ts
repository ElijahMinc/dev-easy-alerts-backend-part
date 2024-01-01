import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { validateAuthDispetcher } from "../middlewares/validateAuthDispetcher.middleware";
import UserController from "../controllers/UserController/UserController";
import { accessByRole } from "../middlewares/accessByRole.middleware";
import { Roles } from "../constants";
import { validateLoginDispetcher } from "../middlewares/validateLoginDispetcher";
import { validateEditDispetcher } from "../middlewares/validateEditDispatcher";

const userRouter = Router()

userRouter.post(UserController.loginUrl, validateLoginDispetcher, UserController.login)
userRouter.get(UserController.checkAuthUrl, authMiddleware, UserController.checkAuth)

userRouter.get(UserController.getDispatcherUrl, authMiddleware, accessByRole([Roles.ADMIN]), UserController.getAll)
userRouter.get(UserController.getDispatcherByIdUrl, authMiddleware, accessByRole([Roles.ADMIN]), UserController.getUserById)
userRouter.post(UserController.createDispatcherUrl, authMiddleware, validateAuthDispetcher, accessByRole([Roles.ADMIN]), UserController.createDispatcher)
userRouter.put(UserController.updateDispatcherByIdUrl, authMiddleware, accessByRole([Roles.ADMIN]), validateEditDispetcher, UserController.updateDispatcherById)
userRouter.delete(UserController.deleteDispatcherByIdUrl, authMiddleware, accessByRole([Roles.ADMIN]), validateAuthDispetcher, UserController.deleteDispatcherById)

export default userRouter;