const express = require('express')
const app = express()
const port = 5000
const mongoose = require('mongoose')
mongoose.connect('mongodb+srv://jang:jang@boiler.s8slg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify: false
}).then(() => console.log('MongoDb connect'))
.catch(err => console.log(err))
app.get('/', (req, res)=> res.send('Hello World!sadasdd'))

app.listen(port, ()=>console.log('Example app listening on port ${port}!'))