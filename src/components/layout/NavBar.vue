<template>
   <div class="navbar">
      <nav class="deep-purple darken-1">
         <div class="container">
            <router-link to="/" class="brand-logo left">
               Geo Location
            </router-link>
            <ul class="right">
               <li v-if="!user">
                  <router-link to="/signup">Signup</router-link>
               </li>
               <li v-if="!user">
                  <router-link to="/login">Login</router-link>
               </li>
               <li v-if="user">
                  <a>
                     {{ user.email }}
                  </a>
               </li>
               <li v-if="user">
                  <a @click="logout">Logout</a>
               </li>
            </ul>
         </div>
      </nav>
   </div>
</template>

<script>
import firebase from "firebase"
export default {
   name: "NavBar",
   data() {
      return {
         user: null,
      }
   },
   methods: {
      logout() {
         firebase
            .auth()
            .signOut()
            .then(() => {
               this.$router.push("login")
            })
      },
   },
   created() {
      firebase.auth().onAuthStateChanged((user) => {
         if (user) {
            this.user = user
         } else {
            this.user = null
         }
      })
   },
}
</script>

<style></style>
