<template>
  <q-page>
    <div v-if="statusPage1">
      <div class="row absolute-center">
        <img round
          src="../../public/img/LOGO-cash-connection_v1.png"
          style="width: 200px; height: 200px"
          class="bg-white border-radious-50"
        />
      </div>
      <div class="row">
        <div
          class="text-h5 text-center text-bold absolute-bottom q-mb-xl text-blue-color"
        >
          CASH CONNECT
        </div>
      </div>
    </div>
    <div v-if="statusPage2">
      <q-card>
        <q-card
          flat
          class="bg-white-9 my-card q-mx-xl q-mt-xl opacity-80 fixed-top"
        >
          <q-card-section>
            <div class="text-h5 text-center text-bold">YOUR ACCOUNT</div>
          </q-card-section>
          <q-card-section>
            <div class="text-center q-my-md">
              <q-icon size="5rem" name="person" class="userProfile" />
            </div>
            <div class="text-center text-bold text-h6 q-my-md">Enter PIN</div>
            <div class="row text-center q-mb-md">
              <q-icon
                class="col text-yellow-color"
                size="1rem"
                :name="authPin[0].name"
                id="auth1"
              >
              </q-icon>
              <q-icon
                class="col text-yellow-color"
                size="1rem"
                :name="authPin[1].name"
                id="auth2"
              >
              </q-icon>
              <q-icon
                class="col text-yellow-color"
                size="1rem"
                :name="authPin[2].name"
                id="auth3"
              >
              </q-icon>
              <q-icon
                class="col text-yellow-color"
                size="1rem"
                :name="authPin[3].name"
                id="auth4"
              >
              </q-icon>
              <q-icon
                class="col text-yellow-color"
                size="1rem"
                :name="authPin[4].name"
                id="auth5"
              >
              </q-icon>
              <q-icon
                class="col text-yellow-color"
                size="1rem"
                :name="authPin[5].name"
                id="auth6"
              >
              </q-icon>
            </div>
            <div class="row">
              <q-btn
                stretch
                flat
                class="col text-center text-blue-14 q-mb-md"
                label="Forgotten PIN"
              ></q-btn>
            </div>
          </q-card-section>
        </q-card>

        <q-card flat class="bg-white-9 my-card fixed-bottom">
          <q-card-section>
            <div class="row q-my-md">
              <q-btn
                flat
                class="col text-h6 text-center text-bold"
                @click="putPin(1)"
                label="1"
              />
              <q-btn
                flat
                class="col text-h6 text-center text-bold"
                @click="putPin(2)"
                label="2"
              />
              <q-btn
                flat
                class="col text-h6 text-center text-bold"
                @click="putPin(3)"
                label="3"
              />
            </div>
            <div class="row q-my-md">
              <q-btn
                flat
                class="col text-h6 text-center text-bold"
                @click="putPin(4)"
                label="4"
              />
              <q-btn
                flat
                class="col text-h6 text-center text-bold"
                @click="putPin(5)"
                label="5"
              />
              <q-btn
                flat
                class="col text-h6 text-center text-bold"
                @click="putPin(6)"
                label="6"
              />
            </div>
            <div class="row q-my-md">
              <q-btn
                flat
                class="col text-h6 text-center text-bold"
                @click="putPin(7)"
                label="7"
              />
              <q-btn
                flat
                class="col text-h6 text-center text-bold"
                @click="putPin(8)"
                label="8"
              />
              <q-btn
                flat
                class="col text-h6 text-center text-bold"
                @click="putPin(9)"
                label="9"
              />
            </div>
            <div class="row q-my-md">
              <div class="col text-h6 text-center text-bold"></div>
              <q-btn
                flat
                class="col text-h6 text-center text-bold"
                @click="putPin(0)"
                label="0"
              />
              <q-btn flat class="col text-h6 text-center text-bold">
                <q-icon
                  size="sm"
                  @click="deletePin"
                  class="col"
                  name="backspace"
                />
              </q-btn>
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
    await new Promise((resolve) => setTimeout(resolve, 1000));
    this.statusPage1 = false;
    this.statusPage2 = true;
    this.jsonAccount = this.$route.query.data;
    const q = query(
        collection(this.$db, "account"),
        where("email", "==", String(this.jsonAccount.accountNumber))
      );
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots

        const docs = doc.data()
        console.log("🚀  doc:", doc.id)
        this.jsonAccount.id = doc.id
        this.jsonAccount.name= docs.name
        this.jsonAccount.number= docs.number
        this.jsonAccount.type= docs.type
        this.user_account_id = doc.id

      });
  },
  components: {},
  data() {
    return {
      statusPage1: true,
      statusPage2: false,
      authPin: [
        { status: false, name: "mdi-circle-outline" },
        { status: false, name: "mdi-circle-outline" },
        { status: false, name: "mdi-circle-outline" },
        { status: false, name: "mdi-circle-outline" },
        { status: false, name: "mdi-circle-outline" },
        { status: false, name: "mdi-circle-outline" },
      ],
      pinNum:"",
      jsonAccount:null,
      pin: 0,
    };
  },
  methods: {
    putPin(num) {
      if (this.pin < 5 && this.pin >= 0) {
        this.authPin[this.pin].name = "mdi-circle";
        this.pinNum+=String(num)
        console.log("🚀  pinNum:", this.pinNum)
        this.pin = this.pin + 1;
      } else if (this.pin == 5) {
        this.authPin[this.pin].name = "mdi-circle";
        this.pinNum+=String(num)
        console.log("🚀  pinNum:", this.pinNum)
        if(this.pinNum==this.jsonAccount.accountPin){
          this.$router.push({
            path:"/menu/home",
            query:{
              data:this.jsonAccount
            }
          });
        }else{
          this.pin=0
          this.pinNum=""
          for(let i=5;i>=0;i--){
            this.authPin[i].status=false
            this.authPin[i].name="mdi-circle-outline"
          }
        }

      }
    },
    deletePin() {
      if (this.pin <= 5 && this.pin > 0) {
        this.authPin[this.pin].name = "mdi-circle-outline";
        this.pin = this.pin - 1;
        this.pinNum=this.pinNum.slice(0,this.pin)
      } else if (this.pin == 0) {
        this.authPin[this.pin].name = "mdi-circle-outline";
      }
    },
  },
};
</script>
