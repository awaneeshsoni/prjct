import express from "express"
import mongoose from "mongoose"
import { configDotenv } from "dotenv"
import cors from "cors"
import authRoutes from "./routes/authRoutes.js"
import linkRoutes from "./routes/linkRoutes.js"
import pageRoutes from "./routes/pageRoutes.js"
import messageRoutes from "./routes/messageRoutes.js"
import paymentRoutes from "./routes/paymentRoutes.js"
configDotenv();

const app = express();
const PORT = process.env.PORT;
const corsOptions = {
    origin: ['https://inonepage.vercel.app', 
        'http://localhost:5173', 
        'https://inonepage.contentarc.co',
        'https://prjct.in',
        'https://www.prjct.in',
        'https://prjctin.vercel.app',

    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true
}

app.use(cors())
app.use(cors(corsOptions))
app.use(
    "/api/payment/webhook",
    express.raw({ type: "application/json" }) 
);
app.use(express.json())
app.use('/api/auth', authRoutes)
app.use('/api/links', linkRoutes)
app.use('/api/pages', pageRoutes)
app.use('/api/messages', messageRoutes)
app.use('/api/payment', paymentRoutes)

app.use('/', (req, res) => {
    res.send('<h1>Hi</h1>');
})

mongoose
    .connect(process.env.MONGO_URI)
    .then(() => app.listen(PORT, () => { console.log("Port started", PORT) }))
    .then(console.log("mongo connected!"))
    .catch((err) => { console.log("Err connecting to mongoDB: " + err) })