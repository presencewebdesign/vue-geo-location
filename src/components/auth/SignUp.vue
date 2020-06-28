<template>
   <div class="signup container">
      <form @submit.prevent="SignUp" class="card-panel">
         <h2 class="center deep-purple-text">Signup</h2>
         <div class="field">
            <label for="email">Email:</label>
            <input type="text" name="email" v-model="email" />
         </div>
         <div class="field">
            <label for="password">Password:</label>
            <input type="password" name="password" v-model="password" />
         </div>
         <div class="field">
            <label for="alias">Alias:</label>
            <input type="text" name="alias" v-model="alias" />
         </div>
         <p v-if="feedback" class="red-text center">{{ feedback }}</p>
         <div class="field center">
            <button class="btn deep-purple">Signup</button>
         </div>
      </form>
   </div>
</template>

<script>
import db from "../../firebase/init"
import slugify from "slugify"
import firebase from "firebase"

export default {
   name: "SignUp",
   data() {
      return {
         email: null,
         password: null,
         alias: null,
         feedback: null,
         slug: null,
      }
   },
   methods: {
      SignUp() {
         console.log(this.email, this.password, this.alias)
         if (this.alias && this.email && this.password) {
            this.slug = slugify(this.alias, {
               replacement: "-",
               remove: /[$*_+~.()'"!\-:@]/g,
               lower: true,
            })
            let ref = db.collection("users").doc(this.slug)
            ref.get().then((doc) => {
               if (doc.exists) {
                  this.feedback = "This alias already exists"
               } else {
                  ref.set({ alias: this.alias, geolocation: null })
                     .then(() => {
                        return firebase
                           .auth()
                           .createUserWithEmailAndPassword(
                              this.email,
                              this.password
                           )
                     })
                     .then((cred) => {
                        return ref.update({ user_id: cred.user.uid })
                     })
                     .then(() => {
                        this.$router.push({ name: "GMap" })
                     })
                     .catch((err) => {
                        this.feedback = err.message
                     })
               }
            })
         } else {
            this.feedback = "You must enter all fields"
         }
      },
   },
}
</script>

<style>
.signup {
   max-width: 400px;
   margin-top: 60px;
}
.signup h2 {
   font-size: 2.4em;
}
.signup .field {
   margin-bottom: 16px;
}
</style>
