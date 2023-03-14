import Vue from 'vue'
import { firebase, db, auth, storage } from '../services/firebase'

Vue.prototype.$firebase = firebase
Vue.prototype.$db = db
Vue.prototype.$auth = auth
Vue.prototype.$storage = storage


// export default boot(({app})=>{
//   app.config.globalProperties.$firebase = firebase
//   app.config.globalProperties.$db = db
//   app.config.globalProperties.$auth=auth
//   app.config.globalProperties.$storage = storage
// })
