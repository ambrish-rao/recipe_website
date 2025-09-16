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

// Log image requests
app.use('/images', (req, res, next) => {
  console.log('Image request:', req.url)
  next()
})

app.use("/images", express.static("uploads"))

// DB Connection 
connectDB()

// API Endpoint 
app.use("/api/food", foodRouter)

app.get("/", (req, res) => {
  res.send("API is working")
})

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`)
})
