import React from 'react';
import Logo from '../../component/logo/logo';
import {List,InputItem,WingBlank, WhiteSpace,Button,Radio} from 'antd-mobile';
import {connect} from 'react-redux';
import {register} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom';
const RadioItem=Radio.RadioItem;
@connect((state)=>state.user,
{register}
)
class Register extends React.Component{
    constructor(){
        super();
        this.state={
            user:"",
            pwd:"",
            repeatpwd:"",
            type:"genius"
        }
    }
    handleChange(key,val){
        this.setState({
            [key]:val
        })
    };
    handleRegister(){
       this.props.register(this.state.user,this.state.pwd,this.state.repeatpwd,this.state.type);
    }
    render(){
        return (
            <div>
            {this.props.redirectTo?<Redirect to={this.props.redirectTo}></Redirect>:null}
            <Logo></Logo>
            <WingBlank>
                {this.props.msg?<p className="error-msg">{this.props.msg}</p>:null} 
                <List>
                    <InputItem type="text" 
                    onChange={v=>{this.handleChange('user',v)}}>
                    用户</InputItem>
                    <InputItem type="password" 
                    onChange={v=>{this.handleChange('pwd',v)}}>
                    密码</InputItem>
                    <InputItem type="password" 
                    onChange={v=>{this.handleChange('repeatpwd',v)}}>
                    确认密码</InputItem>
                </List>
                <WhiteSpace></WhiteSpace>
                <RadioItem checked={this.state.type==="genius"}
                onChange={()=>{this.handleChange('user',"genius")}}
                >牛人</RadioItem>
                <WhiteSpace></WhiteSpace>
                <RadioItem checked={this.state.type==="boss"}
                onChange={()=>{this.handleChange('type',"boss")}}
                >BOSS</RadioItem>
                <WhiteSpace></WhiteSpace>
                <Button type="primary" onClick={this.handleRegister.bind(this)}>注册</Button>
            </WingBlank>
            </div>
        )
    }
}
export default Register;