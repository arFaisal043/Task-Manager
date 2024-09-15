import express from "express";
import router from './routes/api.js';
import mongoose from "mongoose";
import cors from "cors";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import {DATABASE,MAX_JSON_SIZE, PORT,REQUEST_LIMIT_NUMBER,REQUEST_LIMIT_TIME,URL_ENCODED, WEB_CACHE} from "./app/config/config.js";

const app = express();

// Security Apply
app.use(cors());
app.use(helmet());

// Request Size Limit
app.use(express.json({limit: MAX_JSON_SIZE}));

// URL Encode(security param)
app.use(express.urlencoded({ extended: URL_ENCODED }));

// Request Rate Limit
const limiter = rateLimit({windowMS:REQUEST_LIMIT_TIME , max: REQUEST_LIMIT_NUMBER});
app.use(limiter);

// Cache
app.set("etag" , WEB_CACHE);


// Connect Database
mongoose.connect(DATABASE , {autoIndex: true}).then( () => {
    console.log("MongoDB connected");
}).catch( () => {
    console.log("MongoDB disconnected");
} )


// router
app.use( "/api" , router );



app.listen(PORT , () => {
    console.log("Server started on port ", PORT);
})