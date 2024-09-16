import express from 'express'
import cookieParser from 'cookie-parser'
import path from 'path'

import { router } from './routes/index.js'

import { ENV_VARS } from './config/envVars.js'
import { connectDB } from './config/db.js'

const app = express()

const PORT = ENV_VARS.PORT
const __dirname = path.resolve()

app.use(cookieParser())
app.use(express.json())

app.use('/api/v1', router)

if (ENV_VARS.NODE_ENV === 'production') {

    //making frontend a static asset
    app.use(express.static(path.join(__dirname, '/frontend/dist')))

    //if get any other routes than the defined in the router above, send that req to frontend index.html
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'frontend', 'dist', 'index.html'))
    })
}

app.listen(PORT, () => {
    console.log('Server listening on http://localhost:' + PORT)
    connectDB()
})