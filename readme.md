# Basic MERN app

## project setup

- create client folder and server folder, in root run npm init.
- in root run npm install.
- in client run npm install.
- make .env file for server in root.
- make .env file for client in client folder in root.
- core backend packages express, cookie-parser, dotenv, bcrypt, jsonwebtoken, mailtrap, mongoose, crypto
- add start and dev scripts.

## setup server(index.js)

- import express, dotenv, cookieparser, routes, connectDB;
- dotenv.config() (reading dotenv content)
- connectDB();
- const app = express();
- app.use(cookieparser());
- app.use(express.json());
- app.use('/api/auth', authRoutes);
- app.listne(port, ()=>{});

## common folder structure for server

Lets first see common folder structure use in most of the MERN app.

- controllers (core backend functions)
- db (connect db and other functionlatiyes related to db)
- emailService (email service utilitie here)
- middleware (middleware, verifytoken , custom error much more)
- models (diffrent schemas)
- routes (routes defination)
- utils (following DRY, write function which is commenly used avoiding repetaion, like token genration(used in signin, login, google auth))

## dotenv setup

here you add the thing like private api, private urls, apikeys, db connection string much more that you dint want to share when you share your code publicaly

make sure to add this in git ignore.

Smaple code

```env
MONGODB_URI = "mongodb+srv://klsklfm;s;l:RInXiklnoH7a0hFJ@authcluster.zcioe.mongodb.net/?retryWrites=true&w=majority&appName=lkdlw"

JWT_SECRET = 'my^sec%%ret@242587$*!!'

MAILTRAP_TOKEN = "kwdkowjefiojweeoifjwiofnefow"

CLIENT_URL = "http://localhost:5173"

```

## DB connection

In db folder create a file named connectDB.

 ```js
import mongoose from "mongoose"; // import  mongoose

// connectDB is an asyn functionas we wait for req to complete
export const connectDb = async () => { 
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URI)
        console.log(`DB connected: ${conn.connection.host}`)
    } catch (error) {
        console.log(error.message)
        process.exit(1) // 1 is failure, 0 is success
    }
}
 ````

Notice that we didnt used `dotenv.config()`  this file is called from index.js hence it is already in scope so you can use content in `.env` file easily.

get this in index file and just call `connectDB()` to connect database.

## Creating models

```js
import mongoose, { mongo } from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    lastLogin: {
        type: Date,
        default: Date.now
    },
    isVerified: {
        type: Boolean,
        default: false
    },
    resetPasswordToken: {
        type: String,
    },
    verificationToken: {
        type: String,
    },
    verificationTokenExpiresAt: {
        type: Date,
    },
    resetPasswordTokenExpiresAt: {
        type: Date,
    }
}, {timestamp: true});

// create a model Users(ye extra s mongoos khud laga dega) using userSchema 
export const USer = mongoose.modle('User', userSchema);
```

## Setup routes

In this section unly lets see how we setup utils and middleware

### middleware

In middle ware folder create a js file, lest take a example commony used verifyToken

#### verifyToken

used to verify user cookie and return user data, it help in authorization of user(if they are allowd to visit particular route or not)

```js
import jwt from 'jsonwebtoken'
import {errorHandler} from '../utils/error.js'
export const verifyToken = (req, res, next) => {
    const token = req.cookies.access_token; //cookie parser initialize in index.js
    if(!token) {
        return next(errorHandler(401, 'unauthorized'));
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if(err){
            return next(errorHandler(401, 'unauthorized'));
        }
        req.user = user;
        next();
    });
};
```

### utils

write commonly used code here to avoide repetation.

#### errorhandeler

error hard to understan to give more user friendly interface to api we use custom errors, lets have a look.

```js
export const errorHandler = (statusCode, message) => {
    const error = new Error();
    error.statusCode = statusCode;
    error.message = message
    return error;
};
```

#### generate Token

```js
import jwt from 'jsonwebtoken';

export const genrateTokenAndSetCookie = (res, userId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET, {
        expiresIn: "7d",
    })
    res.cookie("authToken", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 7 * 24 * 60 * 60 * 1000, // seven days
    });
    return token;
}
```

Now lets talk about routes.

```js
import express from "express";
// these all function are written in controlles to make code more clean and modular
import { checkAuth, logout, login, signup, verifyEmail, forgotPassword, resetPassword } from "../controllers/auth.controller.js";
import { verifyToken } from "../middleware/verifyToken.js";
const router = express.Router();

router.post('/signup', signup)
router.post('/login', login)
router.post('/logout', logout)
router.post('/verify-email', verifyEmail)
router.post('/forgot-password', forgotPassword)
router.post('/reset-password/:token', resetPassword)
router.get("/check-auth", verifyToken, checkAuth)


export default router;
```

## Controllers

