<template>
  <q-page>
    <q-card class="opacity-80" style="height: 100vh">
      <div class="row justify-center">
        <q-icon
          class="q-mt-xl shadow-up-12 check-green border-radious-50"
          size="lg"
          name="check"
        />
      </div>
      <div class="text-center text-h6 q-pt-lg text-bold text-green-color">
        Transfer Success
      </div>
      <div class="text-center text-subtitle2">{{ dateFormat() }}</div>
      <div class="text-center text-subtitle2">{{ codeFormat() }}</div>

      <div class="row q-px-lg q-pt-xl">
        <div class="col-4 text-h6 text-bold">FROM</div>
        <div class="col text-h6 text-bold text-right">
          {{ transaction.from.name }}
        </div>
      </div>
      <div class="row q-px-lg">
        <div class="col text-subtitle2 text-right">
          {{ formatAcc(transaction.from.acc) }}
        </div>
      </div>
      <div class="row q-px-lg q-pt-lg">
        <div class="col-4 text-h6 text-bold">TO</div>
        <div class="col text-h6 text-bold text-right">
          {{ transaction.to.com_name }}
        </div>
      </div>
      <div class="row q-px-lg">
        <div class="col text-subtitle2 text-right">
          {{ `company code : ${transaction.to.com_code}` }}
        </div>
      </div>
      <div class="row q-px-lg">
        <div class="col text-subtitle2 text-right">
          {{ `REF1 : ${transaction.cusInfo.ref1}` }}
        </div>
      </div>
      <div class="row q-px-lg">
        <div class="col text-subtitle2 text-right">
          {{ `REF1 : ${transaction.cusInfo.ref2}` }}
        </div>
      </div>
      <div class="row q-px-lg q-pt-xl">
        <div class="col-5 text-h6 text-bold">AMOUNT</div>
        <div class="col text-h6 text-bold text-right">
          {{ formatNum(transaction.amount) }}
        </div>
      </div>
      <div class="row q-px-lg">
        <div class="col-5 text-h6 text-bold">FEE</div>
        <div class="col text-h6 text-right">0.00</div>
      </div>
      <div class="row q-px-lg q-mt-lg">
        <q-btn outline class="full-width text-center text-h6" color="primary"
          >Share Slip</q-btn
        >
      </div>
      <div class="row q-px-lg q-mt-lg">
        <div class="col">
          Receiver can scan this QR code for checking the transaction
        </div>
        <div class="col-3 text-center">
          <canvas id="qr-code-1"></canvas>
        </div>
      </div>
      <div class="row q-mt-xl">
        <div class="col text-center">
          <a
            @click="toRoute('/menu/home')"
            class="text-blue-color text-h6 text-bold"
            >Return to account ></a
          >
        </div>
      </div>
    </q-card>
  </q-page>
</template>

<script>
import { collection, addDoc, query, where, getDocs, doc, setDoc  } from "firebase/firestore";
import QRious from "qrious";
export default {
  async mounted() {
    const newTransaction = await this.$route.query.data;
    console.log("🚀  newTransaction:", newTransaction);
    this.transaction = await newTransaction;
    this.qrLink = await String(
      String(newTransaction.from.acc) +
        "_" +
        String(newTransaction.to.com_code) +
        "_" +
        String(newTransaction.amount) +
        "_" +
        String(newTransaction.timestamp)
    );

    const user = this.$auth.currentUser;
    // console.log("user ID",user.email)
    const q = query(
      collection(this.$db, "account"),
      where("email", "==", String(user.email))
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      this.udata = doc.data();
      this.sid = doc.id
    });

    try {
      const upDoc = doc(this.$db, "account", this.sid);
      // console.log("🚀  upDoc:", upDoc)
      this.udata.balance=Number(this.udata.balance)-Number(newTransaction.amount)
      setDoc(upDoc, this.udata)
      const docRef = await addDoc(collection(this.$db, "transfers"), {
        amount: this.transaction.amount,
        date: new Date(this.transaction.timestamp),
        from: this.transaction.from.name,
        to: this.transaction.to.com_name,
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }

    await new QRious({
      level: "L",
      padding: 1,
      size: 60,
      element: document.getElementById("qr-code-1"),
      value: this.qrLink,
      // d:{'acc_num':7557859663 ,'acc_name':'Mr.John Something'}
    });
  },
  components: { QRious },
  data() {
    return {
      sid:null,

      udata:null,
      rid:null,
      transaction: null,
      qrLink: `${this.transaction}`,
    };
  },
  methods: {
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
    dateFormat() {
      const formatData = new Date(this.transaction.timestamp)
        .toISOString()
        .replace("T", " ")
        .slice(0, 16);
      return formatData;
    },
    codeFormat() {
      const dateTime = new Date(this.transaction.timestamp);
      const code =
        dateTime
          .toISOString()
          .replace(/-| |:|T/gi, "")
          .slice(0, 12) + `${this.transaction.from.acc}`;
      return `referral code:${code}`;
    },
    toRoute(routePath) {
      this.$router.push(routePath);
    },
  },
};
</script>
