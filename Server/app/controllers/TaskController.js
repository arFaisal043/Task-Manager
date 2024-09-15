import TasksModel from "../models/TasksModel.js";
import mongoose from "mongoose";

// create task
export const createTask = async (req, res) => {

    try {
        let user_id = req.headers['user_id'];
        let RequestBody = req.body;
        RequestBody.user_id = user_id;

        await TasksModel.create(RequestBody);
        return res.json( {status: "success" , "Message": "Task Successfully created" } );
    }
    catch (e) {
        return res.json({status: "fail" , "message": e.toString()});
    }

}


// Delete Task
export const deleteTask = async (req, res) => {

    try {
        let id = req.params.id;
        let user_id = req.headers['user_id'];

        await TasksModel.deleteOne({_id: id , "user_id": user_id});
        return res.json( {status: 'Task deleted successfully' , message: "Task deleted" } );
    }
    catch (e) {
        return res.json({status: "fail" , "Message": e.toString()});
    }
}


// Update task
export const updateTaskStatus = async (req, res) => {

    try {
        let id = req.params.id;
        let status = req.params.status;
        let user_id = req.headers['user_id'];

        await TasksModel.updateOne(
            {"_id": id , "user_id": user_id} ,
            {status: status}
        );
        return res.json( {status: 'success from updateTaskStatus' , message: "Task Successfully updated" } );
    }
    catch (e) {
        return res.json({status: "fail" , "Message": e.toString()});
    }

}


// Update task
export const taskListByStatus = async (req, res) => {

    try {
        let user_id = req.headers['user_id'];
        let status = req.params.status;
        let data = await TasksModel.find(
            {
                user_id: user_id,
                status: status
            });
        return res.json( {status: "success" , "Message": "Task List" , data: data } );
    }
    catch (e) {
        return res.json({status: "fail" , "Message": e.toString()});
    }

}

// Count Task
export const countTask = async (req, res) => {

    try {
        let objectId = mongoose.Types.ObjectId;
        let user_id = new objectId(req.headers['user_id']);
        let data = await TasksModel.aggregate([

            {
                $match:{user_id: user_id}
            },
            {
                $group:{_id: "$status" , sum: {$count: {}}}
            }

        ])
        return res.json( {status: 'success' , message: 'Task Count Successfully' , data: data } );
    }
    catch (e) {
        return res.json({status: "fail" , "Message": e.toString()});
    }
}

