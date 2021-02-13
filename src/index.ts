import express from 'express'
import mainRoute from './app/route'

const app = express()
const PORT = 8000
app.use(express.json())

app.use('/users', mainRoute)

app.listen(PORT, () => {
    console.log(`listening....`)
})