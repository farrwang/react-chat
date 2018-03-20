react虚拟dom尽量避免跨层级操作

shouldComponentUpdate()生命周期函数可定制，只有此函数返回值为true时才会执行更新
例如：
```
    shouldComponentUpdate(nextProps,nextState){
        if(this.state.num%5===0){
            return true;
        }else{
            return false;
        }
    }
```

setState()重新渲染是异步的，需要set的内容都会放到队列里，统一更新，在render()函数中切不可写setState(),回到找死循环

简易版本redux的实现
```
    export function createStore(reducer){
        currentState={};
        currentListener=[];
        getState(){
            return currentState;
        }
        subscribe(listener){
            currentListener.push(listener);
        }
        dispatch(action){
            currentState=reducer(currentState,action)
            currentListener.map(v=>v());
        }
        //初始化action
        dispatch({type:'@@@rdeux/init'});
        return {getState,subscribe,dispatch};
    }
```

redux最基本的作用就是解决组件之间属性传递，多层组件传递参数，耗费性能

react组件优化

1.属性优化</br>
2.多组件优化</br>
3.key优化

函数绑定this尽量在构造函数中进行，使用bind和箭头函数性能比较差

传递的变了尽量在render外定义，在render内定义每次
单组件减少render渲染

react性能查看
在url后加"/?react_perf",然后在浏览器performance中查看性能，主要看Usering timing
多组件不必要重新渲染时可以在shouldComponentUpdate()生命周期函数中进行控制

独自的组件，没有外部状态的组件也可以直接extend PureComponent来渲染，纯净的组件其他组件改变时不会进行渲染
```
shouldComponentUpdate(nextProps,nextState)
{
    //compare(obj,boj1)只做浅层对比，不做深层次比较
    if(compare(nextProps,this.props)){
        return false;
    }
}
```
使用immutable库控制数据 进行性能优化

react动画组件使用ant motion

服务端渲染，多数情况使用renderToString,服务端渲染完成后不用在浏览器端再通过react来渲染


react 16新特性

1.新的核心算法Fiber
2.render可以直接返回数组和字符串
3.错误处理机制
4.Portals组件
5.更好更快的服务端渲染，可以采用流的形式返回
4.体积更小，支持MIT协议

新增生命周期
//页面渲染出错时触发
componentDidCatch(){
    
}