require('dotenv').config()



const mongoose  = require("mongoose")
const express   = require("express")
const app       = express()

// Middlewares
const bodyParser    = require('body-parser')
const cookieParser  = require('cookie-parser')
const cors          = require('cors')

//auth routes
const authRoutes = require("./routes/auth")

//User routes
const userRoutes = require("./routes/user")

//workshop routes
const workshopRoutes = require("./routes/workshop")

//payment routes
const paymentRoutes = require("./routes/payment");


//DB connection
mongoose.connect(process.env.DATABASE,{
    useNewUrlParser: true,
    useUnifiedTopology:true ,
    useCreateIndex:true
}).then(() => {
    console.log("DB connected")
})


//MIDDLEWARES
app.use(bodyParser.json())
app.use(cookieParser())
app.use(cors())


// //My Routes
app.use("/api" , authRoutes)
app.use("/api" , userRoutes)
app.use("/api" , workshopRoutes)
app.use("/api/payment/", paymentRoutes);


//PORT
const port = process.env.PORT || 8000;


//starting the server
app.listen(port , () => {
    console.log(`App is running at ${port}`);
})


