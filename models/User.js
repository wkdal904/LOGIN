const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const saltRounds = 10
//솔트를 이용해서 암호화 하는 데 솔트의 자리수는 10으로
//설정한 것이다.
const jwt = require('jsonwebtoken');
const userSchema = mongoose.Schema({
    name: {
        type:String,
        maxlength: 50
    },
    email: {
        type: String,
        trim: true,
        unique:1
    },
    Password: {
        type:String,
        minlength:5
    },
    lastname: {
        type:String,
        maxlength: 50
    },
    role: {
        type:Number,
        default: 0
    },
    image:String,
    token: {
        type:String
    },
    tokenExp: {
        type: Number
    }
});
//save전에 펑션을 줘서 그save전에 함수가 실행되도록 하는 것이다.
userSchema.pre('save', function( next ){
    var user = this;
    //비밇번호를 암호화 한다


    //이때 정보를 수정할 때마다ㅏ 암호화를 할수는 없기때문에
    //비밀번호 수정시에만 암호화하도록 조건을 달아준다.
    if(user.isModified('Password')){

    //솔트를 만들고 펑션은 에러가 난다면 err아니라면 salt
    bcrypt.genSalt(saltRounds, function(err, salt){
        if (err) return next(err)

        bcrypt.hash(user.Password, salt, function(err, hash){
            if (err) return next(err)
            user.Password=hash 
            next()

            })
         })
    }else{
        next()
        //비밀번호를 바꾸는게 아닐경우에 next로 빠져나간다
    }
})

userSchema.methods.comparePassword = function(plainPassword, cb){
    //플레인패스워드가 1234567이라하고 암호화된비밀번호가 같은지
    //확인해야한다 따라서 1234567을 암호화해서 db에있는
    //암호화패스워드와 비교해서 맞는지 봐야한다
    bcrypt.compare(plainPassword, this.Password, function(err, isMatch){
        if(err) return cb(err);
        cb(null, isMatch)
    })
}

userSchema.methods.generateToken = function(cb){

    var user = this;
    //jsonwebtoken을 이용해서 토큰을 생성하기
    var token = jwt.sign(user._id.toHexString(), 'secretToken')

   user.token=token
   user.save(function(err, user){
       if(err) return cb(err)
       cb(null, user)
   })
}
const User = mongoose.model('User', userSchema)

module.exports={ User }