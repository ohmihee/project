import { createStore, applyMiddleware, Middleware, StoreEnhancer, Store, compose } from "redux"
import rootReducer from "../reducers"
import { Context,MakeStore, createWrapper } from "next-redux-wrapper";
import createSaga, {Task} from "redux-saga";
import rootSaga from '../saga'
import {RootState} from '../reducers'
import { composeWithDevTools } from 'redux-devtools-extension'

export interface SagaStore extends Store {
    sagaTask?: Task,
    __persistor?: any
}

// const bindMiddleware = (middleware:Middleware[]):StoreEnhancer => {
//     if (process.env.NODE_ENV !== 'production') {
//         //composeWithDevTools(applyMiddleware(...middleware));
//         return composeWithDevTools(applyMiddleware(...middleware));
//     }else if(process.env.NODE_ENV === 'production'){
//         return applyMiddleware(...middleware);
//     }
//     // compose(applyMiddleware(...middleware));
//     // return compose(applyMiddleware(...middleware));
// }



const getEnhancer = () => {
    const sagaMiddlewares = createSaga()
    const Middlewares = [sagaMiddlewares]
    const enhencer:StoreEnhancer = (
      process.env.NODE_ENV === 'production'
      ? compose(applyMiddleware(...Middlewares))
      : composeWithDevTools(applyMiddleware(...Middlewares))
    )
    return {enhencer,sagaMiddlewares}
  }

const makeStore = (context:Context) => {
    const isServer = typeof window == 'undefined'
    let {enhencer,sagaMiddlewares} = getEnhancer()
    
    if(isServer) {
        const Store:SagaStore = createStore(rootReducer,enhencer)
        Store.sagaTask = sagaMiddlewares.run(rootSaga)
        return Store
    }else {
        const {persistStore, persistReducer} = require('redux-persist')
        const storage = require('redux-persist/lib/storage').default
        
        const persistConfig = {
            key: "root",
            storage, // localStorage에 저장합니다.
            whitelist: ["user"] // user, board, studio 3개의 reducer 중에 auth reducer만 localstorage에 저장합니다.
            // blacklist -> 그것만 제외합니다
          };

        const persistedReducer  = persistReducer(persistConfig,rootReducer)
        const Store:SagaStore = createStore(persistedReducer,enhencer)
        Store.__persistor = persistStore(Store)
        Store.sagaTask = sagaMiddlewares.run(rootSaga)

        return Store
    }
}

export const wrapper = createWrapper<Store<RootState>>(makeStore, { 
    debug: process.env.NODE_ENV === 'development', 
});



