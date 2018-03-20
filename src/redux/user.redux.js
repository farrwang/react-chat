import axios from 'axios';
import {getRedirectPath} from '../util';
const initState={
    redirectTo:'',
    msg:'',
    user:'',
    pwd:'',
    type:''
}

//reducer
export function user(state=initState,action){
    switch(action.type){
        case 'AUTH_SUCCESS':
        return {...state,redirectTo:getRedirectPath(action.payload),msg:'',...action.payload};
        case 'ERROR_MSG':
        return {...state,isAuth:false,msg:action.msg};
        case 'LOAD_DATA':
        return {...state,...action.payload};
        case 'LOGOUT':
        return {...initState,redirectTo:'/login'}
        default:
        return state;
    }
}

//action
function errMsg(msg){
    return{msg,type:'ERROR_MSG'};
}
function atuhSuccess(data){
    return {type:'AUTH_SUCCESS',payload:data};
}
export function logoutSubmit(){
    return {type:'LOGOUT'}
}
export function loadData(data){
    return {type:'LOAD_DATA',payload:data};
}
export function update(data){
   return dispatch=>{
       axios.post('/user/update',data).then(
           (res)=>{
            if(res.status===200&&res.data.code===0){
                dispatch(atuhSuccess(res.data.data))
            }else{
                dispatch(errMsg(res.data.msg));
            }
           }
       )
   } 
}
export function register(user,pwd,repeatpwd,type){
    if(!user||!pwd){
        return errMsg('用户名密码不能为空');
    }
    if(pwd!==repeatpwd){
        return errMsg('密码和确认密码不相等'); 
    } 
   return dispatch=>{
    axios.post('/user/register',{user,pwd,type}).then(
        (res)=>{
            if(res.status===200&&res.data.code===0){
                dispatch(atuhSuccess({user,pwd,type}))
            }else{
                dispatch(errMsg(res.data.msg));
            }
        }
    )
   }
}
export function login({user,pwd}){
    if(!user||!pwd){
        return errMsg('用户名密码必须输入');
    }
    return dispatch=>{
        axios.post('/user/login',{user,pwd}).then(
            (res)=>{
                if(res.status===200&&res.data.code===0){
                    dispatch(atuhSuccess(res.data.data))
                }else{
                    dispatch(errMsg(res.data.msg));
                }
            }
        )
       }

}
