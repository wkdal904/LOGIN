import React, {useEffect} from 'react';
import Axios from 'axios';
import { useDispatch } from 'react-redux';
import {auth} from '../_actions/user_action';
export default function(SpecificComponent, option, adminRoute = null){

        function AuthenticationCheck(props){
            const dispatch = useDispatch();
        
        useEffect(() => {

            dispatch(auth()).then(response =>{
                console.log(response)
                //로그인 하지않은 상태
                if(!response.payload.isAuth){
                    if(option===true){
                        props.history.push('./login')
                        //못가게 그냥 로그인 페이지로 보내버리는것
                    }
                }else{
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('./login')
                    }else{
                        if(option===false){
                            props.history.push('/')
                        }
                    }
                }

                
            })

        }, [])
        return (
            <SpecificComponent />
        )
    }
    return AuthenticationCheck
}
