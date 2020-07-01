import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

  const routes = [
  {
    path: '/',
    name: 'Home',
    meta : {
      title: 'Home',
    },
    component: () => import('../views/Home.vue')
  },
  {
    path: '/login',
    name: 'Login',
    meta : {
      title: 'Login',
    },
    component: () => import('../views/Login.vue'),
    beforeEnter: (to, from, next) => {     
      if (store.getters['auth/authenticated']) {
        return next({
          name : 'Admin'
        })
      }  
      next()
    }
  },
  {
    path: '/admin',
    name: 'Admin',
    meta : {
      title: 'Admin',
    },
    component: () => import('../views/Admin.vue'),
    beforeEnter: (to, from, next) => {
      if (!store.getters['auth/authenticated']) {
        return next({
          name : 'Login'
        })
      }
      next()
    }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

router.afterEach((to) => {
  if (to.meta && to.meta.title) {
    document.title = to.meta.title + ' | Portfolio';
  }
});

export default router
