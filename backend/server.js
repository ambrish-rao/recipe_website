import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoute.js"
 

// app config
const app = express()
const port = 4000

//  Middleware
app.use(express.json())
app.use(cors())

// DB Connection 
connectDB();


// API Endpoint 
    app.use("/api/food", foodRouter)
    app.use("/images", express.static("uploads"))


app.get("/", (req, res) => {
  res.send("API is working")
})

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`)
    })


    //mongodb+srv://ambrishrao2494:<db_password>@cluster0.e5xna8z.mongodb.net/?