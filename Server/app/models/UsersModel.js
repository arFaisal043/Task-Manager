import mongoose from 'mongoose';

// Those users data we have to need
const UserSchema = new mongoose.Schema(
    {
        email:{type:String,unique:true , required:true},
        firstName:{type:String , required:true},
        lastName:{type:String , required:true},
        mobile:{type:String , required:true},
        password:{type:String,unique:true , required:true},
        otp:{type:String,default: 0},
    },
    {
        timestamps: true,
        versionKey: false,
    }
);

const Users = mongoose.model('Users', UserSchema);

export default Users;