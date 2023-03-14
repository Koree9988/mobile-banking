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
        <div class="text-center text-h6 q-pb-xs q-pt-md text-bold">
          Bill Payment
        </div>
        <div class="text-subtitle1 q-px-lg text-bold">From</div>
        <q-card style="border-radius: 20px 20px" class="q-mx-lg">
          <q-card-section>
            <div class="row">Current Balance (THB)</div>
            <div class="row">
              <div class="col q-mt-xs">{{ account.type }}</div>
              <div class="col text-right text-h5 text-bold">
                {{ formatNum(account.balance) }}
              </div>
            </div>
            <div class="row text-subtitle1 q-mt-xs">
              {{ formatAcc(account.number) }}
            </div>
          </q-card-section>
        </q-card>
        <div class="text-subtitle1 q-mt-xs q-px-lg text-bold">To</div>
        <q-card style="border-radius: 20px 20px" class="q-mx-lg">
          <div class="row text-subtitle1 text-bold q-pt-md q-px-md">
            {{ providerData.name }}
          </div>
          <div class="row text-subtitle2 q-pb-md q-px-md">
            {{ `Company Code:${providerData.code}` }}
          </div>
        </q-card>
        <div class="text-subtitle q-mx-lg">Customer information</div>
        <q-card style="border-radius: 20px 20px" class="q-mx-lg q-mt-sm">
          <q-input
              class="col q-pt-sm q-px-md text-subtitle1"
              v-model="cusInfo.ref1"
              type="number"
              :min="0"
              maxlength="10"
              :dense="true"
              label="REF1"
            />

        </q-card>
        <q-card style="border-radius: 20px 20px" class="q-mx-lg q-mt-sm">
          <q-input
              class="col q-pt-sm q-px-md text-subtitle1"
              v-model="cusInfo.ref2"
              type="number"
              :min="0"
              maxlength="10"
              :dense="true"
              label="REF2"
            />

        </q-card>
        <div class="text-subtitle q-mx-lg">Amount</div>
        <q-card style="border-radius: 20px 20px" class="q-mx-lg q-mt-sm">
          <q-input
                input-class="text-right"
                class="q-px-lg text-subtitle1"
                v-model="cusInfo.amount"
                type="number"
                :min="0"
                :step="0.01"
                :decimals="2"
                :formatter="
                  (val) => (val || val === 0 ? parseFloat(val).toFixed(2) : '')
                "
                :parser="(val) => (val || val === 0 ? parseFloat(val) : null)"
              />

        </q-card>

        <div class="q-mx-lg q-mt-lg">
          <q-btn class="full-width" color="primary" label="Confirm" @click="transactionSlip()"/>
        </div>


      </q-card>
    </div>
  </q-page>
</template>

<script>
import { collection, query, where, getDocs } from "firebase/firestore";
export default {
  async mounted() {
    this.providerData = this.$route.query.data;
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
    });
  },
  components: {},
  data() {
    return {
      account: {
        id: 0,
        number: null,
        name:null,
        balance: null,
        type: null,
        eye: { status: true, name: "visibility" },
      },
      providerData: null,
      cusInfo:{
        ref1:null,
        ref2:null,
        amount:null
      }

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
    formatNum(num) {
      return parseFloat(num).toLocaleString("en", {
        maximumFractionDigits: 2,
        minimumFractionDigits: 2,
      });
    },
    formatAcc(accNum) {
      const str = String(accNum);
      return str.slice(0, 3) + "-" + str.slice(3, 9) + "-" + str.slice(9);
    },
    toRoute(routePath) {
      this.$router.push(routePath);
    },
    transactionSlip(){
      const newTransaction = {
        "amount": Number(this.cusInfo.amount),
        "timestamp": Date.now(),
        "from": { "acc": Number(this.account.number), "name": String(this.account.name) },
        "to": { "com_code": Number(this.providerData.code), "com_name": String(this.providerData.name) },
        "cusInfo":{"ref1":Number(this.cusInfo.ref1),"ref2":Number(this.cusInfo.ref2)}
      }

      console.log("🚀  transaction:", newTransaction)
      this.$router.push({
        path:'/billslip',
        query:{
          data:newTransaction
        }
      })
    }

  },
};
</script>
