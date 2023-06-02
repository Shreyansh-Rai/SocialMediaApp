import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import { error } from "console";
import authRoutes from "./routes/auth.js" ;
import { register } from "./controllers/auth.js";
import userRoutes from "./routes/users.js"
import postRoutes from "./routes/posts.js"
import { verifyToken } from "./middleware/auth.js";
import {createPost} from "./controllers/posts.js";
import User from "./models/User.js";
import Post from "./models/Post.js";
import {users,posts} from "./Data/index.js"
//middleware config, TL;DR func that run betw diff things.
const __filename = fileURLToPath (import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config();//This line loads environment variables from the .env file using the dotenv library. The .env
const app = express();
app.use(express.json());//The express.json() middleware is used to parse JSON request bodies. It makes the parsed JSON data available in req.body for subsequent request handlers.
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin"}));
app.use(morgan("common"));//This is a logging middleware that logs HTTP requests to the console. It provides information like request method, status code, and response time.
app.use(bodyParser.json({ limit: "30mb", extended: true }));//This line configures the body-parser middleware to parse JSON request bodies. extended here means nested JSON requests are allowed
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));//configures the body-parser middleware to parse URL-encoded request bodies. URL - encoded data is commonly used in HTML forms.
app.use(cors());//Cross-Origin Resource Sharing (CORS), allowing the server to handle requests from different domains or origins.
app.use("/assets",express.static(path.join(__dirname,'public/assets'))); //Setting the assets directory.

//File storage config
// TODO: Done

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
    cb(null, "public/assets"); //callback supplied by multer input validation of sorts raises error if something wrong else stores.
    },
    filename: function (req, file, cb) {
    cb(null, file.originalname);
    }
});
/*
SRC: DOCS
The multer.diskStorage function accepts an object that defines two properties: destination and filename.
destination: This property specifies the directory where uploaded files will be stored.
It is a function that takes three arguments: req (the request object), file (the uploaded file object), and cb (a callback function).
In this case, the function sets the destination directory as "public/assets".
The cb function is then called to indicate that the destination has been set.
*/
const upload = multer({storage})
//FILE ROUTES
//if hit call register function from the controllers directory auth js.
app.post("/auth/register", upload.single("picture"), register);  //we have this seperately because we need the multer upload function over here. picture property is where blob is from front end. could be eanything as long as it matches with front end.
app.post("/posts",verifyToken,upload.single("picture"),createPost);
//other routes. all controllers are found in the controller.js file 
app.use("/auth", authRoutes); 
app.use("/users",userRoutes);
app.use("/posts", postRoutes);
//TODO: Done Backend Completed. Data loaded to mongo db.
//TODO: Move on to frontend 1:41:29

// MONGOOSE SETUP

const PORT = process.env.PORT || 6001;
//SRC : DOCS https://mongoosejs.com/docs/connections.html#options
mongoose.connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    app.listen(PORT, () => console. log(`Server Port: ${PORT}`))
    // User.insertMany(users);
    // Post.insertMany(posts);
    //just inputting some testing data to try the app out. do not uncomment 
}).catch((error) => {
    console.log(`${error},did not connect.`)
})

//TODO: Done