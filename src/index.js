import express from 'express'
import cors from 'cors'
import ProvinceRouter from './controllers/provinceController.js'

const app = express()
const port = 3000;

app.use(cors())
app.use(express.json())

app.use("/api/provinces/", ProvinceRouter)

app.get("/", (req, res) => {
    res.send("API funcionando")
})

app.listen(port, () => {
    console.log(`App funcionando en http://localhost:${port}`)
})
