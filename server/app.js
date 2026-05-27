
require('dotenv').config(); 
const express = require('express');
const cors=require("cors");
const connectDB = require('./config/db');
const userRoute=require('./routes/userRoutes');
const movieRoute =require("./routes/movieRoutes");
const theatreRoutes=require("./routes/theatreRoutes");




connectDB(process.env.DB_URL);

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors());
app.use("/api/users",userRoute);
app.use("/api/movie",movieRoute);
app.use("/api/theatre",theatreRoutes);


app.listen(PORT,()=>{
    console.log(`Server is running on port ${PORT}`);
})