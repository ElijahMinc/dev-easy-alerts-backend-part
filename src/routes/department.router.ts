import { Router } from "express";
import authMiddleware from "../middlewares/auth.middleware";
import { accessByRole } from "../middlewares/accessByRole.middleware";
import { Roles } from "../constants";
import DepartmentController from "../controllers/DepartmentController/DeparmentController";
import { validateDepartment } from "../middlewares/validateDepartment";

const departmentRouter = Router()

departmentRouter.post(DepartmentController.createDepartmentUrl, authMiddleware, validateDepartment, accessByRole([Roles.ADMIN]), DepartmentController.createDepartment)
departmentRouter.put(DepartmentController.updateDepartmentByIdUrl, authMiddleware, validateDepartment, accessByRole([Roles.ADMIN]), DepartmentController.updateDepartmentById)
departmentRouter.get(DepartmentController.getAllDeparmentsUrl, authMiddleware, accessByRole([Roles.ADMIN, Roles.DISPATCHER]), DepartmentController.getAllDepartments)
departmentRouter.get(DepartmentController.getAllDeparmentByIdUrl, authMiddleware, accessByRole([Roles.ADMIN, Roles.DISPATCHER]), DepartmentController.getDepartmentById)

export default departmentRouter;