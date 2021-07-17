
import React, {useState}  from 'react'
import { useDispatch } from 'react-redux';
import { loginUser } from '../../../_actions/user_action';
import {withRouter} from 'react-router-dom';

function LoginPage(props) {
    const dispatch = useDispatch();

    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const onEmailHandler =(event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordHandler= (event) => {
        setPassword(event.currentTarget.value)
    }
    const onSubmitHandler = (event)=>{
        event.preventDefault();
        //이게 없다면 아무것도하지않고 로그인만 눌러도
        //페이지가 refresh가 되어버려서 원래 해야할 일들을 할 수 없어진다.

        let body ={
            email : Email,
            password : Password
        }

        dispatch(loginUser(body))
        .then(response=> {
            if(response.payload.loginSuccess){
                props.history.push('/')
                //루트페이지로 가게해준다
                //이때 props를 LoginPage의 파라미터로 넣어줘야한다
            }else{
                alert('Error')
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
            <label>Password</label>
            <input type="password" value={Password} onChange={onPasswordHandler} />

            <br />
            <button type="submit">
                Login
            </button>
        </form>
        </div>
    )
}

export default withRouter(LoginPage)