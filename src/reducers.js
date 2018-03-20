//合并多个reducers
import {combineReducers} from 'redux';
// import {reducer} from './react.redux';
// import {auth} from './auth.redux';
import {user} from './redux/user.redux';
import {chatuser} from './redux/chatuser.redux';
import {chat} from './redux/chat.redux';
 //export default combineReducers({reducer:reducer,auth:auth});
 export default combineReducers({user,chatuser,chat});