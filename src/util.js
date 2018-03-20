//根据用户返回信息，跳转到相应页面
export function getRedirectPath({type,avatar}){
    let url=(type==='boss')?'/boss':'/genius';

    if(!avatar){
        return url+'info';
    }
    return url;

}