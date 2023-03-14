<template>
  <q-page>
    <q-card square flat class="blue-color-top">
      <q-card-section class="row q-my-auto absolute-bottom-left">
        <div class="col">
          <q-btn
            v-if="nextProcess"
            flat
            class="text-white"
            @click="backProcess"
          >
            <q-icon
              round
              size="2rem"
              name="arrow_back_ios"
              class="text-white"
            />
            Back
          </q-btn>
          <q-btn
            v-if="!nextProcess"
            flat
            class="text-white"
            @click="toRoute('/menu/home')"
          >
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
      <div class="text-center text-h6 q-py-lg text-bold">Transfer</div>
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
      <div class="text-subtitle1 q-mt-md q-px-lg text-bold">To</div>
      <div v-if="!nextProcess">
        <div class="text-subtitle1 q-px-lg">Account Number</div>
        <q-card style="border-radius: 20px 20px" class="q-mx-lg">
          <div class="text-subtitle1 q-pa-md">
            <q-input
              class="q-px-md text-subtitle1"
              v-model="transferDetail.accNum"
              type="text"
              :min="0"
              maxlength="10"
              :dense="true"
            />
          </div>
        </q-card>
        <div class="row q-mt-sm">
          <div class="col-4 text-subtitle1 q-px-lg">Amount</div>
          <div class="col text-right text-caption q-px-lg">
            Daily limit:500000.00 THB
          </div>
        </div>

        <q-card style="border-radius: 20px 20px" class="q-mx-lg">
          <div>
            <q-input
              input-class="text-right"
              class="q-px-md text-h6"
              v-model="transferDetail.amount"
              type="number"
              :min="0"
              :step="0.01"
              :decimals="2"
              :formatter="
                (val) => (val || val === 0 ? parseFloat(val).toFixed(2) : '')
              "
              :parser="(val) => (val || val === 0 ? parseFloat(val) : null)"
            />
          </div>
        </q-card>
        <div class="row q-mt-sm">
          <div class="col-4 text-subtitle1 q-px-lg">Note</div>
          <div class="col text-right text-caption q-px-lg">
            {{ character }} Characters left
          </div>
        </div>
        <q-card style="border-radius: 20px 20px" class="q-mx-lg">
          <div>
            <div>
              <q-input
                class="q-px-md text-SUBTITLE2"
                maxlength="30"
                v-model="transferDetail.note"
              />
            </div>
          </div>
        </q-card>
        <div class="q-mx-lg q-mt-lg">
          <q-btn
            class="full-width"
            color="primary"
            label="Next"
            @click="toNextProcess"
          />
        </div>
      </div>

      <div v-if="nextProcess">
        <div class="text-subtitle1 q-px-lg">Account Number</div>
        <q-card style="border-radius: 20px 20px" class="q-mx-lg">
          <div class="row text-h6 q-mt-md q-py-sm q-px-md">
            {{ transferDetail.accName }}
          </div>
          <div class="text-suntitle1 q-px-md">CC</div>
          <div class="text-subtitle1 q-px-md">
            {{ formatAcc(transferDetail.accNum) }}
          </div>
        </q-card>
        <div class="row q-mt-xl">
          <div class="col-4 text-h6 q-px-lg">Amount</div>
          <div class="col text-right text-h6 q-px-lg">
            {{ formatNum(transferDetail.amount) }} THB
          </div>
        </div>
        <div class="row">
          <div class="col-4 text-h6 q-px-lg">Fee</div>
          <div class="col text-right text-h6 q-px-lg">
            {{ formatNum(0) }} THB
          </div>
        </div>
        <div class="q-mx-lg q-mt-lg">
          <q-btn
            class="full-width"
            color="primary"
            label="confirm"
            @click="transactionSlip()"
          />
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
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
    });
  },
  data() {
    return {
      accData: {
        acc_num: null,
        acc_name: null,
      },
      account: {
        id: 0,
        name:null,
        number: null,
        balance: null,
        type: null,
        eye: { status: true, name: "visibility" },
      },
      nextProcess: false,
      transferDetail: {
        accName: null,
        amount: null,
        note: "",
        accNum: null,
      },
      character: 30,
      dense: false,
    };
  },
  methods: {
    eyeClick(idx) {
      if (this.account[idx].eye.status) {
        this.account[idx].eye.name = "visibility_off";
        this.account[idx].eye.status = false;
      } else {
        this.account[idx].eye.name = "visibility";
        this.account[idx].eye.status = true;
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
    async toNextProcess() {
      const q = query(
        collection(this.$db, "account"),
        where("number", "==", Number(this.transferDetail.accNum))
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        const nameData = doc.data()
        this.transferDetail.accName=nameData.name

      });

      this.nextProcess = true;
    },
    backProcess() {
      this.nextProcess = false;
    },
    toRoute(routePath) {
      this.$router.push(routePath);
    },
    transactionSlip(routeName) {
      const newTransaction = {
        amount: Number(this.transferDetail.amount),
        timestamp: Date.now(),
        from: {
          acc: Number(this.account.number),
          name: String(this.account.name),
        },
        to: {
          acc: Number(this.transferDetail.accNum),
          name: String(this.transferDetail.accName),
        },
      };

      console.log("🚀  transaction:", newTransaction);
      this.$router.push({
        path: "/transactionslip",
        query: {
          data: newTransaction,
        },
      });
    },
  },
};
</script>
