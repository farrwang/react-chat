import React from 'react';
import Logo from '../../component/logo/logo';
import {connect} from 'react-redux';
import {List,InputItem,WingBlank, WhiteSpace,Button} from 'antd-mobile';
import {login} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom';
@connect(
    (state)=>state.user,
    {login}
)
class Login extends React.Component{
    constructor(props) {
        super(props);
        this.state={
            user:'',
            pwd:''
        }
    }
    register(){
        this.props.history.push('/register');
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleLogin(){
        this.props.login(this.state);
    }
    render(){
        return (
            <div>
                {this.props.redirectTo&&this.props.redirectTo!=='/login'?<Redirect to={this.props.redirectTo}></Redirect>:null}
                <Logo></Logo>
                <WingBlank>
                {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null} 
                <List>
                    <InputItem onChange={(v)=>{this.handleChange('user',v)}} type="text">用户</InputItem>
                    <InputItem onChange={(v)=>{
                        this.handleChange('pwd',v)
                    }} type="password">密码</InputItem>
                </List>
                <WhiteSpace></WhiteSpace>
                <Button onClick={this.handleLogin.bind(this)} type="primary">登陆</Button>
                <WhiteSpace></WhiteSpace>
                <Button type="primary" onClick={this.register.bind(this)}>注册</Button>
                </WingBlank>
            </div>
        )
    }
}
export default Login;