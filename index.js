const express = require('express')
const hbs = require('hbs')

const taskRouter = require('./routes/tasks.routes')

const PORT = 3005
const app = express()



app.use(express.urlencoded({extended:true}))
// app.use(express.static('./frontend/public'))


app.set('view engine', 'hbs')
app.set('views', './frontend/views')
hbs.registerPartials('./frontend/layouts')
app.use(taskRouter)


app.listen(PORT, ()=>console.log('start server at http://localhost:'+PORT))