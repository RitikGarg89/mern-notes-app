import dotenv from "dotenv";

// dotenv Config
dotenv.config({
    path: "./.env"
})

import express from "express";
import cors from 'cors'

const app = express();


// CORS Config
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    methods: ["GET", "POST", "PATCH", "DELETE"],
    credentials: true
}))

app.use(express.json({
    limit: "16kb"
}
))

app.use(express.urlencoded({
    limit: "16kb",
    extended: true
}))

export { app }