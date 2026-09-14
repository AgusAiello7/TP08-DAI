import express from 'express'
import swaggerUi from 'swagger-ui-express';
import swaggerFile from '../swagger_output.json' with { type: 'json' };
import cors from 'cors'
import ProvinceRouter from './controllers/provinceController.js'
import AdminRouter from './controllers/adminController.js'

const app = express()
const port = 3000;

app.use(cors())
app.use(express.json())

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerFile));

app.use("/api/provinces", ProvinceRouter)

app.use("/admin/", AdminRouter)

app.get("/", (req, res) => {
    res.send("API funcionando")
})

app.listen(port, () => {
    console.log(`App funcionando en http://localhost:${port}`)
})
