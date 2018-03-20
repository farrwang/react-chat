import React from 'react';
import {connect} from 'react-redux';
import {Result,List,WhiteSpace,Modal} from 'antd-mobile';
import browserCookie from 'browser-cookies';
import {logoutSubmit} from '../../redux/user.redux';
import { Redirect } from 'react-router-dom';
@connect(
    state=>state.user,
    {logoutSubmit}
)
class User extends React.Component{
    logout(){
        const alert=Modal.alert;
        alert('注销','你确定退出吗？',[
            {text:'取消'},
            {text:'确定',onPress:()=>{
                browserCookie.erase('userid');
                this.props.logoutSubmit();
            }}
        ])
      
    }
    render(){
        const Item=List.Item;
        const Brief=Item.Brief;
        
        return(
            this.props.user?(<div>
                <Result
                img={<img src={require(`../img/${this.props.avatar}.png`)} style={{width:50}} alt=""/>}
                title={(<div style={{fontSize:15}}>{this.props.user}</div>)}
                message={this.props.type==='boss'?(<div>{this.props.company}</div>):null}
                />
                <List renderHeader='简介'
                >
                <Item>{this.props.title}
                {this.props.desc.split('\n').map(v=>(<Brief key={v}>{v}</Brief>))}
                {this.props.money?(<Brief>薪资{this.props.money}</Brief>):null}
                </Item>
                </List>
                <WhiteSpace></WhiteSpace>
                <List>
                    <Item onClick={this.logout.bind(this)}>退出登录</Item>
                </List>
            </div>):<Redirect to={this.props.redirectTo}></Redirect>
        )
    }
}
export default User;