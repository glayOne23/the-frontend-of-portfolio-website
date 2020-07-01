import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueParticles from 'vue-particles'
import axios from 'axios'
import Swal from 'sweetalert2'
import moment from 'moment'

axios.defaults.baseURL = 'http://localhost:8000/api/'

require('@/store/subscriber')

Vue.config.productionTip = false

// Use
Vue.use(VueParticles)

// Sweet Alert
Vue.prototype.$Swal = Swal
const Toast = Swal.mixin({
  toast: true,
  position: 'top-end',
  showConfirmButton: false,
  timer: 3000,
  timerProgressBar: true,
})
Vue.prototype.$Toast = Toast

// Filter and moment js
Vue.filter('formatDate', (date) => {
  return moment(date).format('MMMM Do YYYY');
})

// Token and create vue instance
store.dispatch('auth/attempt', localStorage.getItem('token'))
  .then(() => {
    new Vue({
      router,
      store,
      render: h => h(App)
    }).$mount('#app')

  })

