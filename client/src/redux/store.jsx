import { createStore, applyMiddleware, compose } from 'redux'
import reducers from './reducers'
import createSagaMiddleware from 'redux-saga'
import rootSaga from './sagas/root.saga'

const sagaMiddleware = createSagaMiddleware()
const store = createStore(reducers, compose(applyMiddleware(sagaMiddleware)));
sagaMiddleware.run(rootSaga)

export default store;