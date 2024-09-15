import {tokenDecode} from "../utilities/tokenutility.js";

export default (req,res,next)=>{

    let token = req.headers["token"];
    let decoded = tokenDecode(token);

    if(decoded === null) {
        res.status(401).json({status: "fail" , message: "Unauthorized"});
    }
    else {
        let email = decoded.email;
        let user_id = decoded.user_id ;
        req.headers.email = email;
        req.headers.user_id = user_id;
        next();
    }
}