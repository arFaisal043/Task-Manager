import mongoose from 'mongoose';

// Those users data we have to need
const TaskSchema = new mongoose.Schema(
    {
        title:{type:String , required: true},
        description:{type:String , required: true},
        status:{type:String , required: true},
        user_id:{type:mongoose.Schema.Types.ObjectId , required: true}
    },
    {
        timestamps: true,
        versionKey: false
    }
);

const Tasks = mongoose.model('tasks', TaskSchema);

export default Tasks;