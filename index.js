const express = require('express')
const app = express()
const port = 5000
const config = require('./config/key');

const bodyParser = require("body-parser");
const { User } = require("./models/User");
//어플리케이션을 분석해서 가져오는것
app.use(bodyParser.urlencoded({extended: true}));
//json의 어플파일을 분석해서 가져오는 것
app.use(bodyParser.json());

const mongoose = require('mongoose')
mongoose.connect(config.mon,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify: false
}).then(() => console.log('MongoDb connect'))
.catch(err => console.log(err))
app.get('/', (req, res)=> res.send('Hello World!saa아ㅓ눌ㄴ'))


app.post('/register', (req, res)=>{
    //회원가입시에 필요한 정보를 cli에서 가져오면
    //그것들을 데이터베이스에 넣어준다.
    const user = new User(req.body)

    user.save((err, userInfo)=>{
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})
app.listen(port, ()=>console.log('Example app listening on port ${port}!'))