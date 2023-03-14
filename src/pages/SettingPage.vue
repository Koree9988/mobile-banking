<template>
  <q-page>
    <div>
      <q-card square flat class="blue-color-top">
        <q-card-section class="row q-my-auto absolute-bottom-left">
          <div class="col">
            <q-btn flat class="text-white" @click="toRoute('/menu/home')">
              <q-icon
                round
                size="2rem"
                name="arrow_back_ios"
                class="text-white"
              />
              Back
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
      <q-card square flat class="bg-grey-14" style="height: 1.3rem"></q-card>
      <q-card class="opacity-80" style="height: 78vh">
        <q-card square flat class="rmbg">
          <q-card-section class="row">
            <div class="col-3 text-left q-my-md">
              <q-icon
                round
                size="4rem"
                name="person"
                class="bg-gray-14 userProfile"
              />
            </div>
            <div class="col text-h6 q-my-auto">{{ acc.name }}</div>
          </q-card-section>
        </q-card>
        <q-card square full-width >
          <!-- email -->
          <q-card-section class="q-mx-md" @click="toRoute('/setting/email')">

              <div class="row text-h6">
                <div class="col">Manage Email</div>
                <div class="col-3 text-green text-right">Approve</div>
              </div>
              <div class="row text-subtitle1">{{ acc.email }}</div>

          </q-card-section>
          <!-- phone number -->
          <q-card-section class="q-mx-md" @click="toRoute('/setting/phone')">

              <div class="row text-h6">
              <div class="col">Manage Phone number</div>
              <div class="col-3 text-green text-right">Approve</div>
            </div>
            <div class="row text-subtitle1">{{ acc.phone }}</div>


          </q-card-section>
          <!-- language -->
          <q-card-section class="q-mx-md">
            <div class="row text-h6">
              <div class="col">Language</div>
            </div>
          </q-card-section>
        </q-card>
        <!-- account setting -->
        <div class="text-h6 text-bold q-my-sm q-mx-lg">Account setting</div>

        <q-card square full-width>
          <!-- account -->
          <q-card-section class="q-mx-md">
            <div class="row text-h6">
              <div class="col">Manage Account</div>
            </div>
          </q-card-section>
          <!-- phone number -->
          <q-card-section class="q-mx-md" @click="toRoute('/setting/pin')">
            <div class="row text-h6">
              <div class="col">Change PIN</div>
            </div>
          </q-card-section>
          <!-- language -->
          <q-card-section class="q-mx-md" @click="toRoute('/setting/limit')">
            <div class="row text-h6">
              <div class="col">Tranfer Limit</div>
            </div>
          </q-card-section>
        </q-card>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { collection, query, where, getDocs } from "firebase/firestore";
export default {
  async mounted(){
    const user = this.$auth.currentUser;
    // console.log("user ID",user.email)
    const q = query(
      collection(this.$db, "account"),
      where("email", "==", String(user.email))
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      const docs = doc.data();
      this.acc.email = docs.email;
      this.acc.name = docs.name;
      this.acc.phone = docs.phone;
    });
  },
  components: {},
  data() {
    return {
      balance: 3000.25,
      eye: { status: true, name: "visibility" },
      acc: {
        name: null,
        email: null,
        phone: null,
        pin: "012345",
        transfer: 500000,
      },
    };
  },
  methods: {
    eyeClick() {
      if (this.eye.status) {
        this.eye.name = "visibility_off";
        this.eye.status = false;
      } else {
        this.eye.name = "visibility";
        this.eye.status = true;
      }
    },
    toRoute(routePath) {
      this.$router.push(routePath);
    },
  },
};
</script>
