const express = require('express')
const app = express()
const db = require("./models")
const cors = require("cors")

app.use(express.json())
app.use(cors())

// mount
const userRouter = require("./routes/UserRouter")
app.use("/user", userRouter)

db.sequelize.sync().then(() => {
    app.listen(3001, () => {console.log("Server Listening To Port 3001")})
})
