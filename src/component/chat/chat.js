import React from 'react';
import {List,InputItem,NavBar,Icon} from 'antd-mobile';
import {connect} from 'react-redux';
import {sendMsg,getMsgList,recvMsg} from '../../redux/chat.redux';
const Item=List.Item;
@connect(
    state=>state,
    {sendMsg,recvMsg,getMsgList}
)
class Chat extends React.Component{
    constructor(props){
        super(props);
        this.state={
            text:'',
            msg:[]
        }
    }
    componentDidMount(){
        if(!this.props.chat.chatmsg.length){
            this.props.getMsgList();
            this.props.recvMsg();
        }
    }
    handleSubmit(){
        const from=this.props.user._id;
        const to=this.props.match.params.userid;
        const msg=this.state.text;
        this.props.sendMsg({from,to,msg});
        this.setState({text:''});
    }
    render(){
        const userid=this.props.user._id;
        const users=this.props.chat.users;
        const touserid=this.props.match.params.userid;
        if(!users[userid]||!users[touserid]){
            return null;
        }
        return(
            <div id="chat-page">
            <NavBar mode='dark'
            icon={<Icon type="left" />}
            onLeftClick={()=>{
                this.props.history.goBack()
            }}
            >
            {users[touserid].user}
            </NavBar>
            { 
                this.props.chat.chatmsg.map(k=>{
                    let avatar=require(`../img/${users[k.from].avatar}.png`)
                    return k.from===userid?(
                        <List className="chat-me" key={k._id}>
                            <Item extra={<img src={avatar} alt=""/>}>{k.content}</Item>
                        </List>
                    ):(
                        <List key={k._id}>
                            <Item 
                            thumb={avatar}
                            >{k.content}</Item>
                        </List> 
                    )
                 })
            }
            <div className="stick-footer">
                <List>
                    <InputItem
                    placeholder='请输入'
                    value={this.state.text}
                    onChange={
                        v=>{
                            this.setState({text:v})
                        }
                    }
                    extra={<span onClick={()=>this.handleSubmit()}>发送</span>}
                    >
                    </InputItem>
                </List>
            </div>
            </div>
        )
    }
}
export default Chat;