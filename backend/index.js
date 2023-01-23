const express = require("express");
const linkRoute = require("./route/linkRoute")
const userRoute = require("./route/userRoute")
const cors = require("cors");

const connect = require("./helper/db")
connect();

const port = 8000;
const app = express(); 

const corsOptions ={
    origin:'http://localhost:3000', 
    credentials:true,  
    optionSuccessStatus:200
}

app.use(cors(corsOptions));

app.use(express.json()); 
app.use("/links", linkRoute)
app.use("/users", userRoute)

app.listen(port, () => {
    console.log(`server running at localhost:${port}`);
})

