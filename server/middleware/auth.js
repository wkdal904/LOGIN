const { User } = require('../models/User');

let auth = (req, res, next)=>{

    //인증처리를 하는곳 

    //클라쿠키에서 토큰을 가져온다
    let token = req.cookies.x_auth;

    //토큰을 복호화한 후 유저를 찾는다
    User.findByToken(token, (err, user)=>{
        if(err) throw err;
        if(!user) return res.json({ isAuth: false, error: true})

        req.token = token;
        req.user = user;
        next();
    })
    //유저가있다면 인증 Okay
    //없다면 No


}

module.exports={auth};