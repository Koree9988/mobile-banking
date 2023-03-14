<template>
  <q-page>
    <div>
      <q-card square flat class="bg-color-blue blue-color-top">
        <q-card-section class="row">
          <div class="col text-left q-my-md">
            <q-icon
              round
              size="3rem"
              name="person"
              class="bg-white userProfile"
            />
          </div>
          <div class="col text-right q-my-auto q-mr-md">
            <q-btn flat round>
              <q-icon
                round
                size="2rem"
                name="notifications"
                class="text-white"
              />
            </q-btn>
          </div>
        </q-card-section>
      </q-card>
      <q-card square flat class="bg-grey-14" style="height: 1.3rem"></q-card>
      <q-card class="opacity-80" style="height: 78vh">
        <q-card square flat class="rmbg q-mx-sm">
          <q-card-section>
            <div class="row m">
              <q-card class="bg-white full-width">
                <q-card-section>
                  <div class="row">Current Balance (THB)</div>
                  <div class="row text-bold text-h4 q-my-md">
                    <div class="col">{{ getAccountDetail() }}</div>
                    <div class="col text-right">
                      <q-icon size="md" :name="eye.name" @click="eyeClick" />
                    </div>
                  </div>
                </q-card-section>
              </q-card>
            </div>
            <div class="row q-mt-md full-width">
              <q-card
                class="col text-center q-my-md q-mx-sm main-icon"
                @click="toRoute('/menu/transfer')"
              >
                <q-icon
                  round
                  size="2.5rem"
                  name="mdi-bank-transfer"
                  class="bg-white text-blue-color"
                />
                <div class="menu-text text-bold">Transfer</div>
              </q-card>
              <q-card
                class="col text-center q-my-md q-mx-sm main-icon"
                @click="toRoute('/topup')"
              >
                <q-icon
                  round
                  size="2.5rem"
                  name="mdi-plus-circle"
                  class="bg-white text-blue-color"
                />
                <div class="menu-text text-bold">Top Up</div>
              </q-card>
              <q-card
                class="col text-center q-my-md q-mx-sm main-icon"
                @click="toRoute('/menu/paybill')"
              >
                <q-icon
                  round
                  size="2.5rem"
                  name="mdi-script-text"
                  class="bg-white text-blue-color"
                />
                <div class="menu-text text-bold">Pay Bills</div>
              </q-card>
              <q-card
                class="col text-center q-my-md q-mx-sm main-icon"
                @click="toRoute('/myqr')"
              >
                <q-icon
                  round
                  size="2.5rem"
                  name="mdi-qrcode"
                  class="bg-white text-blue-color"
                />
                <div class="menu-text text-bold">My QR</div>
              </q-card>
            </div>
            <div class="row q-mb-md full-width">
              <q-card
                class="col text-center q-my-md q-mx-sm main-icon"
                @click="toRoute('/fund')"
              >
                <q-icon
                  round
                  size="2.5rem"
                  name="payments"
                  class="bg-white text-blue-color"
                />
                <div class="menu-text text-bold">Mutual Funds</div>
              </q-card>
              <q-card
                class="col text-center q-my-md q-mx-sm main-icon"
                @click="toRoute('/insurance')"
              >
                <q-icon
                  round
                  size="2.5rem"
                  name="mdi-shield-check"
                  class="bg-white text-blue-color"
                />
                <div class="menu-text text-bold">Insurance</div>
              </q-card>
              <q-card
                class="col text-center q-my-md q-mx-sm main-icon"
                @click="toRoute('/loan')"
              >
                <q-icon
                  round
                  size="2.5rem"
                  name="mdi-account-cash"
                  class="bg-white text-blue-color"
                />
                <div class="menu-text text-bold">Online Loan</div>
              </q-card>
              <q-card
                class="col text-center q-my-md q-mx-sm main-icon"
                @click="toRoute('/favorite')"
              >
                <q-icon
                  round
                  size="2.5rem"
                  name="mdi-star-box-multiple"
                  class="bg-white text-blue-color"
                />
                <div class="menu-text text-bold">Favorites</div>
              </q-card>
            </div>
            <div class="row full-width">
              <q-card class="bg-white full-width" style="height: 180px">

                  <q-img src="../../public/img/Travel insurance.png" style="height: 180px"/>

              </q-card>
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
  name: "PageIndex",
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
        const docs = doc.data()
        this.balance=docs.balance

      });
  },

  data() {
    return {
      balance: null,
      eye: { status: true, name: "visibility" },
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
    getAccountDetail() {
      if (this.eye.status) {
        return parseFloat(this.balance).toLocaleString("en", {
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        });
      } else {
        return "--.--";
      }
    },
  },
};
</script>
