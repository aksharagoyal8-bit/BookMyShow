
require('dotenv').config(); 
const express = require('express');
const cors=require("cors");
const connectDB = require('./config/db');
const userRoute=require('./routes/userRoutes');




connectDB(process.env.DB_URL);

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
app.use("/api/users",userRoute);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})