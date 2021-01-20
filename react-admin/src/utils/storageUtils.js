import store from 'store2'
const USER_KEY='user_key'
const USER_AUTHORITIES='user_authorities'

export default {
    saveUser(user){
        store.set(USER_KEY,user)
    },
    getUser(){
        return store.get(USER_KEY)
    },
    removeUser(){
        store.remove(USER_KEY)
        this.removeUserAuthorities()
    },
    saveUserAuthorities(authorities){
        store.set(USER_AUTHORITIES,authorities)
    },
    getUserAuthorities(){
        return store.get(USER_AUTHORITIES)
    },
    removeUserAuthorities(){
        store.remove(USER_AUTHORITIES)
    },
}