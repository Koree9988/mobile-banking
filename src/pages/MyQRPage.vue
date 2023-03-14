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
      <div class="row q-mt-md">
        <div class="col text-center">
          <img
            src="../../public/img/LOGO-cash-connection_v1.png"
            style="width: 80px; height: 80px"
          />
        </div>
      </div>
      <div class="row">
        <div class="col text-center text-blue-color text-bold">
          CASH CONNECT
        </div>
      </div>
      <div class="row q-mx-xl q-my-md">
        <q-card class="bg-white full-width">
          <q-card-section class="bg-primary text-white">
            <div class="text-h6 text-center">My QR payment</div>
          </q-card-section>
          <q-separator />

          <q-card-section class="bg-white text-center">
            <div class="row">
              <div class="col text-center">
              <canvas id="qr-code"></canvas>
            </div>
            </div>
            <!-- <q-icon name="qr_code_2" size="16rem" /> -->

          </q-card-section>
        </q-card>
      </div>
      <div class="row">
        <div class="col text-center text-h5 text-bold">Account Name</div>
      </div>
      <div class="row">
        <div class="col text-center text-h6">{{ account.name }}</div>
      </div>
    </div>
  </q-page>
</template>

<script>
import QRious from "qrious";
import { collection, query, where, getDocs } from "firebase/firestore";
export default {
  async mounted() {
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
      this.account.balance = docs.balance;
      this.account.number = docs.number;
      this.account.name = docs.name;
      this.account.type = docs.type;
      this.qrLink = `{"acc_num":${docs.number} ,"acc_name":"${docs.name}"}`
    });
    new QRious({
      level: "L",
      padding: 25,
      size: 280,
      element: document.getElementById("qr-code"),
      value: this.qrLink,
      // d:{'acc_num':7557859663 ,'acc_name':'Mr.John Something'}
    });
  },
  components: { QRious },
  data() {
    return {
      qrLink: null,
      account: {
        id: 0,
        name:null,
        number: null,
        balance: null,
        type: null,
        eye: { status: true, name: "visibility" },
      },
    };
  },
  methods: {
    toRoute(routePath) {
      this.$router.push(routePath);
    },
  },
};
</script>
