import "reflect-metadata"
import express from 'express';
import db from './db/dataSource'
import dotenv from 'dotenv'
// import { Db } from "typeorm";

// import { Index } from "typeorm";


const app = express() ; 
const PORT = 3000 ; 

app.use(express.json());

 

app.listen(PORT,() =>{
console.log(`app is running and listening on port ${PORT}`);
db.initialize();
})


export default app;
