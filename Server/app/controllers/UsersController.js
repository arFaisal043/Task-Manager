import UsersModel from "../models/UsersModel.js";
import {tokenEncode} from "../utilities/tokenutility.js";
import e from "express";
import usersModel from "../models/UsersModel.js";
import sendEmail from "../utilities/emailUtility.js";
import {EMAIL_PASS} from "../config/config.js";



// -- Users Registration/Sign Up
export const registration = async(req, res) => {

    try {
        let reqBody = req.body;
        await UsersModel.create(reqBody);
        return res.json( {status: "success" , "Message": "User Registration Successfully" } );
    }
    catch (e) {
        return res.json( {status: "fail" , "Message": e.toString() } );
    }

}


// -- Users Login
export const login = async (req, res) => {

    try {
        let reqBody = req.body;
        let data = await UsersModel.findOne(reqBody);

        if(data == null) {
            return res.json( {status: "fail" , "Message": "User Not Found" } );
        }
        else {
            // We have to use JWT Token if we want login success
            let token = tokenEncode(data["email"] , data["_id"]);
            return res.json( {status: "success" , "Message": "User login Successfully" , data: {token: token} } );
        }
    }
    catch (e) {
        return res.json( {status: "fail" , "Message": e.toString() } );
    }

}



// -- Users forget/reset password ( 1. email verify &  2. code/otp verify )
export const emailVerify = async (req, res) => {

    try {
        let email = req.params.email;
        let data = await usersModel.findOne({email: email});

        if(data == null) {
            return res.json( {status: "fail" , "Message": "User email does not exist" } );
        }
        else {
            // Send OTP to email
            let code = Math.floor(100000 + Math.random() * 900000);

            let EmailTo = data["email"];
            let EmailText = `your code is ${code}`;
            let EmailSubject = "Task Manager Verification Code";
            await sendEmail(EmailTo, EmailText,EmailSubject);

            // Update OTP
            await usersModel.updateOne({email: email} , {otp: code});
            return res.json( {status: "success" , "Message": "User Email Verified Successfully" } );
        }
    }
    catch (e) {
        return res.json( {status: "fail" , "Message": e.toString() } );
    }

}


export const codeVerify = async (req, res) => {

    try {
        let reqBody = req.body;
        let data = await usersModel.findOne({email: reqBody["email"] , otp: reqBody["otp"]});

        if(data == null) {
            return res.json({status: "fail" , "Message": "Wrong Verification Code" } );
        }
        else {
            return res.json({status: "success" , "Message": "Code Verified Successfully" } );
        }
    }
    catch (e) {
        return res.json( {status: "fail" , "Message": e.toString() } );
    }
}


// -- Reset Password

export const resetPassword = async (req, res) => {

    try {
        let reqBody = req.body;
        let data = await usersModel.findOne({email: reqBody["email"] , otp: reqBody["otp"]});

        if(data == null) {
            return res.json({status: "fail" , "Message": "Wrong Verification Code" } );
        }
        else {
            await usersModel.updateOne({email: reqBody["email"]},
                {
                    otp: "0",
                    password: reqBody["password"]
                }
            )
            return res.json({status: "success" , "Message": "Password Reset Successfully" } );
        }
    }
    catch (e) {
        return res.json( {status: "fail" , "Message": e.toString() } );
    }
}


// -- Users want to see profile details and read
export const profileDetails = async (req, res) => {

    try {
        let user_id = req.headers["user_id"];
        let data = await UsersModel.findOne({_id: user_id});
        return res.json( {status: 'success from profileDetails' , message: "User profile details successfully" , data:data} );
    }
    catch(e) {
        return res.json( {status: "fail" , "Message": e.toString() } );
    }
}


// -- If Users want to update his/her profile
export const profileUpdate = async (req, res) => {

    try {
        let reqBody = req.body;
        let user_id = req.headers["user_id"];
        await UsersModel.updateOne({_id: user_id}, reqBody);
        return res.json( {status: "success" , "Message": "User profile update Successfully" } );
    }
    catch (e) {
        return res.json( {status: "fail" , "Message": e.toString() } );
    }

}