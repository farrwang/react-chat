import React from 'react';
import {NavBar,InputItem,TextareaItem,Button} from 'antd-mobile';
import AvatarSelector from '../../component/avatar-selector/avatar-selector';
import {connect} from 'react-redux';
import {update} from '../../redux/user.redux';
import {Redirect} from 'react-router-dom';
@connect(
    state=>state.user,
    {update}
)
class BossInfo extends React.Component{
    constructor(props){
        super(props);
        this.state={
            title:'',
        }
    }
    onChange(key,val){
        this.setState({
            [key]:val
        })
    }
    handleUpate(){
        this.props.update(this.state);
    }
    
    render(){
        return (
            <div>
            {(this.props.redirectTo!==null&&this.props.redirectTo!==undefined&&this.props.redirectTo!==this.props.location.pathname)?<Redirect to={this.props.redirectTo}></Redirect>:null}
            <NavBar mode="dark">BOSS完善信息页面</NavBar>
            <AvatarSelector 
            selectAvatar={(imageName)=>{
                this.setState({
                    avatar:imageName
                })
            }}
            ></AvatarSelector>
            <InputItem onChange={(v)=>{this.onChange('title',v)}}>
            招聘职位
            </InputItem>
            <InputItem onChange={(v)=>{this.onChange('company',v)}}>
            公司名称
            </InputItem>
            <InputItem onChange={(v)=>{this.onChange('money',v)}}>
            职位薪资
            </InputItem>
            <TextareaItem title="职位要求" rows={3} autoHeight={true} onChange={(v)=>{this.onChange('desc',v)}}>
            </TextareaItem>
            <Button onClick={this.handleUpate.bind(this)} type="primary">保存</Button>
            </div>
        )
    }
}
export default BossInfo