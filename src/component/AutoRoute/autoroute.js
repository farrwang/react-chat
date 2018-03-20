import React from 'react';
import {withRouter} from 'react-router-dom';
import axios from 'axios';
import {loadData} from '../../redux/user.redux';
import {connect} from 'react-redux';
@withRouter
@connect(
    state=>state.user,
    {loadData}
)
class AuthRoute extends React.Component{
    componentDidMount(){
        const publishList=['/login','/register'];
        const pathname=this.props.location.pathname;
        if(publishList.indexOf(pathname)>-1){
            return null;
        }
        axios.get('/user/info').then((res)=>{
            if(res.status===200){
                if(res.data.code===0){
                    //有登录信息
                    this.props.loadData(res.data.data);
                }else{
                   this.props.history.push('/login');
                }
            }
        })
    }
    render(){
        return null;
    }
}
export default AuthRoute;