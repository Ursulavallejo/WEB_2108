import express from 'express'
import dotenv from 'dotenv'
import helmet from "helmet"
import morgan from 'morgan'

import middlewares from './middlewares/Middlewares.js'
import Configuration from '../config/Configuration.js'
import TaskRoutes from "./routes/Task.routes.js"
import ApplyMiddlewares from "./middlewares/ApplyMiddlewares.js";
import AliveRoute from "./routes/Alive.route.js"

dotenv.config()
const app = express()

ApplyMiddlewares(app)

app.use(helmet())
app.use(express.urlencoded({extended:true}))
app.use(express.json())

app.use(morgan('common'))

app.get('/recipe', (req, res) => {
    res.send('Pancakes!')
})

AliveRoute.aliveRoute(app)
TaskRoutes.routes(app)

app.use(middlewares.notFound)
app.use(middlewares.errorHandler)

Configuration.connectToPort(app)
Configuration.connectToDatabase(app)


export default app