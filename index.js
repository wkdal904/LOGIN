const express = require('express')
const app = express()
const port = 5000
const config = require('./config/key');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const { User } = require("./models/User");
//어플리케이션을 분석해서 가져오는것
app.use(bodyParser.urlencoded({extended: true}));
//json의 어플파일을 분석해서 가져오는 것
app.use(bodyParser.json());
app.use(cookieParser());


const mongoose = require('mongoose')
mongoose.connect(config.mongoURI,{
    useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex:true, useFindAndModify: false
}).then(() => console.log('MongoDb connect'))
.catch(err => console.log(err))


app.get('/', (req, res)=> res.send('Hello World!saa아ㅓ눌ㄴ'))


app.post('/api/users/register', (req, res)=>{
    //회원가입시에 필요한 정보를 cli에서 가져오면
    //그것들을 데이터베이스에 넣어준다.
    const user = new User(req.body)


    //아래부분이 세이브기 때문에 이전에 암호화해야한다
    user.save((err, userInfo)=>{
        if(err) return res.json({success: false, err})
        return res.status(200).json({
            success: true
        })
    })
})

app.post('/login', (req, res)=>{
    //요청돤 이메일을 데이터베이스에서 있는지찾는다
    User.findOne({ email: req.body.email }, (err, user)=>{
        if(!user){
            return res.json({
                loginSuccess: false,
                message: "제공된 이메일에 해당하는 유저가 없습니다."
            })
        }
    
   //요청된 이메일이 있다면 비밀번호가 맞는지 확인한다
        user.comparePassword(req.body.Password, (err, isMatch)=>{
            if(!isMatch)
            return res.json({ loginSuccess: false, message:"비밀번호가 틀렸습니다."})
        
    //비밀번호가 맞다면 유저를 위한 토큰을 생성한다
        user.generateToken((err, user)=>{
            if(err) return res.status(400).send(err);

            //토큰을 저장한다. 어디에? 쿠키, 로컬스토리지등 가능하다
            res.cookie("x_auth", user.token)
            .status(200)
            .json({ loginSuccess: true, userId: user._id})

        })
        })
    })
})

app.get('/api/users/auth',auth , (req, res)=>{
        


})



app.listen(port, ()=>console.log('Example app listening on port ${port}!'))