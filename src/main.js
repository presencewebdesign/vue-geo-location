import Vue from "vue"
import App from "./App.vue"
import VueRouter from "vue-router"
import firebase from "firebase"
import GMap from "./components/home/GMap"
import SignUp from "./components/auth/SignUp"
import Login from "./components/auth/Login"
import ViewProfile from "./components/profile/ViewProfile"

Vue.use(VueRouter)
let app = null
// wait for firebase auth to iit before creating the app
firebase.auth().onAuthStateChanged(() => {
   // init app if not already created
   if (!app) {
      app = new Vue({
         router,
         render: (h) => h(App),
      }).$mount("#app")
   }
})

const router = new VueRouter({
   mode: "history",
   routes: [
      {
         path: "/map",
         name: "map",
         component: GMap,
         meta: { requiresAuth: true },
      },
      { path: "/signup", name: "SignUp", component: SignUp },
      { path: "/login", name: "Login", component: Login },
      {
         path: "/profile/:id",
         name: "ViewProfile",
         component: ViewProfile,
         meta: { requiresAuth: true },
      },
   ],
})

router.beforeEach((to, from, next) => {
   // Check to see if route requires auth
   if (to.matched.some((rec) => rec.meta.requiresAuth)) {
      // Check auth state of user
      let user = firebase.auth().currentUser
      if (user) {
         // user is signed in proceed
         next()
      } else {
         // no user signed in
         next({ name: "Login" })
      }
   } else {
      next()
   }
})

export default router
