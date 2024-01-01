const {Router} = require('express')

import userRouter from './user.router'
import roleRouter from './role.router';
import adminRouter from './admin.router';
import crewRouter from './crew.router';
import alertRouter from './alert.router';
import alertConfigRouter from './alert-config.router';
import natureOfEmergencyRouter from './natureOfEmergency.router';
import departmentRouter from './department.router';

const configRouter = new Router();

configRouter.use(userRouter)
configRouter.use(roleRouter)
configRouter.use(adminRouter)
configRouter.use(crewRouter)
configRouter.use(alertRouter)
configRouter.use(alertConfigRouter)
configRouter.use(natureOfEmergencyRouter)
configRouter.use(departmentRouter)


export default configRouter