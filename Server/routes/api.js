import express from 'express';
const router = express.Router();

import * as TaskController from "../app/controllers/TaskController.js";
import * as UsersController from "../app/controllers/UsersController.js";
import AuthMiddleware from "../app/middlewares/AuthMiddleware.js";
// import {
//     codeVerify,
//     emailVerify,
//     login,
//     profileDetails,
//     profileUpdate,
//     registration, resetPassword
// } from "../app/controllers/UsersController.js";
// import {
//     countTask,
//     createTask,
//     deleteTask,
//     taskListByStatus,
//     updateTaskStatus
// } from "../app/controllers/TaskController.js";


// <-- Create Routes -->

// Users
router.post('/registration', UsersController.registration);
router.post('/login', UsersController.login);
router.get('/emailVerify/:email', UsersController.emailVerify);
router.post('/codeVerify', UsersController.codeVerify);
router.post('/resetPassword', UsersController.resetPassword);
router.get('/profileDetails', AuthMiddleware, UsersController.profileDetails);
router.post('/profileUpdate', AuthMiddleware , UsersController.profileUpdate);



// Tasks
router.post('/createTask' , AuthMiddleware , TaskController.createTask);
router.get('/deleteTask/:id', AuthMiddleware ,  TaskController.deleteTask);
router.get('/updateTaskStatus/:id/:status' , AuthMiddleware , TaskController.updateTaskStatus);
router.get('/taskListByStatus/:status', AuthMiddleware ,  TaskController.taskListByStatus);
router.get('/countTask', AuthMiddleware ,  TaskController.countTask);


export default router;