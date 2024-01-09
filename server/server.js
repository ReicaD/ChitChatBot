import express from "express";
import * as dotenv from "dotenv";
import cors from "cors";
import { configuration, OpenApi } from "openai";

dotenv.config();
const configuration = new configuration({
  apiKey: process.env.OPEN_API_KEY,
});

const openai =new OpenApi(configuration)

const app = express()
app.use(cors())
app.use(express.json())


app.get("/",async(req,res)=>{
    res.status(200).send({
        message:"Greetings from ChitchatBot ",
    })
})

app.post("/", async(req,res)=>{
 try {
     
 } catch (error) {
     
 }
})