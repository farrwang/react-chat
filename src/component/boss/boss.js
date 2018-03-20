import React from 'react';
import {connect} from 'react-redux';
import {getUserList} from '../../redux/chatuser.redux';
import UserCard from '../../component/usercard/usercard';
@connect(
    state=>state.chatuser,
    {getUserList}
)
class Boss extends React.Component{
    componentDidMount(){
        this.props.getUserList('genius');
    }
    render(){
       return(
            <div>
                <UserCard userList={this.props.userList}></UserCard>
            </div>
       ); 
    }
}
export default Boss