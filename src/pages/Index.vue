<template>
  <q-page>
    <div>
      <q-card
        square
        flat
        class="opacity-80 row full-width"
        style="height: 100vh"
      >
        <q-card-section class="q-my-auto q-mx-auto justify-center">
          <div class="row q-my-sm q-mx-auto">
            <div class="col text-center">
              <q-img
                src="../../public/img/LOGO-cash-connection_v1.png"
                class="col border-radious-50"
                style="width: 100px"
              />
            </div>
          </div>
          <div class="row">
            <div class="col text-center text-h2 text-bold q-mt-xl">SIGN-IN</div>
          </div>

          <div class="row text-h6 text-bold">Cash Connect Account</div>

          <div class="row">
            <div class="q-my-xl">
              <q-input
                standout="bg-gray-14 text-black"
                class="full-width"
                bg-color=""
                v-model="email"
                label="E-mail"
                required
              />
              <q-input
                standout="bg-gray-14 text-dark"
                class="full-width"
                bg-color=""
                v-model="password"
                filled
                :type="isPwd ? 'password' : 'text'"
                label="Password"
                required
              >
                <!-- <template v-slot:append> -->
                <q-icon
                  :name="isPwd ? 'visibility_off' : 'visibility'"
                  class="cursor-pointer q-my-md"
                  @click="isPwd = !isPwd"
                />
                <!-- </template> -->
              </q-input>
              <q-btn
                :ripple="{ center: true }"
                color="primary"
                label="Sign In"
                class="full-width"
                @click="signInUser()"
                :disable="email === '' || password === ''"
              />
            </div>
          </div>
        </q-card-section>
      </q-card>
    </div>
  </q-page>
</template>
<script>
import {
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  browserSessionPersistence,
} from "firebase/auth";

export default {
  data() {
    return {
      authAccountData: {
        accountNumber: "",
        accountPin: "",
      },
      email: "",
      password: "",
      isPwd: true,
      authStatus: false,
    };
  },
  methods: {
    signInUser() {
      setPersistence(this.$auth, browserSessionPersistence)
        .then(() => {
          return signInWithEmailAndPassword(
            this.$auth,
            this.email,
            this.password
          )
            .then((userCredential) => {
              // Signed in
              const user = userCredential.user;
              console.log("🚀  user:", user);
              this.authAccountData.accountNumber = this.email;
              this.authAccountData.accountPin = this.password;
              this.$router.push({
                path: "/auth",
                query: {
                  data: this.authAccountData,
                },
              });
              // ...
            })
            .catch((error) => {
              const errorCode = error.code;
              console.log("🚀  errorCode:", errorCode);
              const errorMessage = error.message;
              console.log("🚀  errorMessage:", errorMessage);

              // ..
            });
        })
        .catch((error) => {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
        });
    },
  },
};
</script>
