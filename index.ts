import "reflect-metadata"
import express from 'express';
import 'reflect-metadata';

// import { Index } from "typeorm";


const app = express() ; 
const PORT = 3000 ; 

app.use(express.json());

 

app.listen(PORT,() =>{
console.log(`app is running and listening on port ${PORT}`);
// db.initialize();
})


export default app
