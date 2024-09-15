import {JWT_EXPIRE_TIME, JWT_KEY} from "../config/config.js";
import jwt from "jsonwebtoken";

export const tokenEncode = (email , user_id) => {
    const KEY = JWT_KEY;
    const EXPIRE = {expiresIn: JWT_EXPIRE_TIME};
    const PAYLOAD = {email: email , user_id: user_id};
    return  jwt.sign(PAYLOAD , KEY , EXPIRE);
}


export const tokenDecode = (token) => {

    try {
        return jwt.verify(token, JWT_KEY);
    }
    catch (e) {
        return null;
    }
}
