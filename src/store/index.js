import {
    createStore
} from 'redux'
import cookie from 'react-cookies'

// const expires = new Date()
// expires.setDate(Date.now() + 1000 * 60 * 60 * 24 * 14)
// cookie.save(
//     'userId',
//     '1234', {
//         path: '/',
//         expires,


//     }
// )
//reducer

const init = {
    likeNum: cookie.load('likeList') ? cookie.load('likeList').length : 0
}
// console.log(document.cookie)
console.log(cookie.loadAll())

const reducers = (state = init, {
    type,
    payload
}) => {
    console.log(type)
    switch (type) {
        case 'ADD_Like':
            return {
                likeNum: payload.likeNum
            }
            default:
                return state
    }
}
//store
const store = createStore(reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())
export default store