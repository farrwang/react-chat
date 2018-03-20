import React from 'react';
import {Grid,List} from 'antd-mobile';
//proptypes控制属性的类型监测
import PropTypes from 'prop-types';
export default class AvatarSelector extends React.Component{
    static propTypes={
        selectAvatar:PropTypes.func.isRequired
    }
    constructor(params) {
     super(params);
     this.state={}
    }
    render(){
        const avatarList='boy,bull,chick,crab,girl,hedgehog,hippopotamus,koala,lemur,man,pig,tiger,whale,woman,zebra'
        .split(',')
        .map((v)=>({
            icon:require(`../img/${v}.png`),
            text:v
        }));
        const gridHeader=this.state.text?(
            <div>
                <span>已选择的头像</span>
                <img style={{width:20}} src={this.state.icon} alt=""></img>
            </div>
        ):<div>请选择头像</div>;
        return(
            <div>
            <List renderHeader={()=>gridHeader}>
            <Grid data={avatarList} columnNum={5} onClick={
                (ele)=>{
                    this.setState(ele);
                    this.props.selectAvatar(ele.text);
                }
            }/>
            </List>
            </div>
        )
    }  
}