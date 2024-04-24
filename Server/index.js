const express = require('express');
const app = express();

const userRoutes = require('./routes/User');
const paymentRoutes = require('./routes/Payments');
const profileRoutes = require('./routes/Profile');
const courseRoutes = require('./routes/Course');

const database = require('./config/database');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {cloudinaryConnect} = require('./config/cloudinary');
const fileUpload = require('express-fileupload');
const dotenv = require('dotenv');
dotenv.config();

const PORT = process.env.PORT || 4000;

//database connect
database.connect();
//middlewares
app.use(express.json());
app.use(cookieParser());
app.use(
    cors({
        origin:"http://localhost:5000",
        credentials:true,
    })
);
app.use(
    fileUpload({
        useTempFiles:true,
        tempFileDir:"/tmp",
    })
);
//app.use(fileUpload());
//cloudinary connection
cloudinaryConnect();
//routes mounting
app.use("/api/v1/auth", userRoutes);
app.use("/api/v1/profile", profileRoutes);
app.use("/api/v1/payment", paymentRoutes);
app.use("/api/v1/course", courseRoutes);

//define home route
app.get('/', (req, res) => {
    return res.send(`<h1><center>Welcome to your Project, Mr. Aashish :))</center></h1>`)
})


app.listen(PORT, () => {
    console.log(`App is running at ${PORT}`);
})


