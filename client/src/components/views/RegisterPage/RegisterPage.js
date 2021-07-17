
import React, {useState}  from 'react'
import { useDispatch } from 'react-redux';
import { registerUser } from '../../../_actions/user_action';
import Axios from 'axios';
import { withRouter } from 'react-router-dom';
function RegisterPage(props) {


    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Name, setName] = useState("")
    const [Password, setPassword] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler =(event) => {
        setEmail(event.currentTarget.value)
    }
    const onNameHandler= (event) => {
        setName(event.currentTarget.value)
    }
    const onPasswordHandler =(event) => {
        setPassword(event.currentTarget.value)
    }
    const onConfirmPasswordHandler= (event) => {
        setConfirmPassword(event.currentTarget.value)
    }

    const onSubmitHandler = (event)=>{
        event.preventDefault();
        //이게 없다면 아무것도하지않고 로그인만 눌러도
        //페이지가 refresh가 되어버려서 원래 해야할 일들을 할 수 없어진다.
        if (Password !== ConfirmPassword){
            return alert('비밀번호와 비밀번호확인의 값이 다릅니다.')
        }
        
        let body ={
            email : Email,
            password : Password,
            name : Name
        }

        dispatch(registerUser(body))
        .then(response=> {
            if(response.payload.success){
                props.history.push("/login")
            }else{
                alert("Failed to sign up")
            }
        })

       
    }
    return (
        <div style={{
            display: 'flex', justifyContent: 'center', alignItems: 'center'
            , width: '100%', height: '100vh'}}>
        <form style={{display: 'flex', flexDirection: 'column'}}
            onSubmit={onSubmitHandler}
        >
            <label>Email</label>
            <input type="email" value={Email} onChange={onEmailHandler} />
            
            <label>Name</label>
            <input type="text" value={Name} onChange={onNameHandler} />
            
            <label>Password</label>
            <input type="password" value={Password} onChange={onPasswordHandler} />
            
            <label>Confirm Password</label>
            <input type="password" value={ConfirmPassword} onChange={onConfirmPasswordHandler} />
            
            <br />
            <button type="submit">
                회원가입
            </button>
        </form>
        </div>
    )
}

export default withRouter(RegisterPage)
