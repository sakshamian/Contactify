const express = require('express');
const morgan = require('morgan');
const connectDB = require('./controllers/DBcontroller');
require('dotenv').config();

const auth = require('./middlewares/auth');
const app = express();

// middlewares
app.use(express.json());
app.use(morgan("tiny"));
app.use(require("cors")());

// routes
app.get("/protected", auth, (req,res)=> {
    return res.status(200).json({user: req.user});
});

app.get('/', (req,res)=> {
    console.log("connected");
    res.end();
});

app.use("/api", require("./routes/authRoutes"));
app.use("/api", require("./routes/contactRoutes"));


// PORT
const PORT = process.env.PORT || 8000;
app.listen(PORT, async() => {
    try{
        await connectDB();
        console.log(`running on port ${PORT}`);
    }
    catch(err){
        console.log(err);
    }
    
})