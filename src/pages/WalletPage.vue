<template>
  <q-page>
    <div>
      <q-card
        square
        flat
        class="bg-color-blue top"
        style="height: 1.3rem"
      ></q-card>
      <q-card class="opacity-80">
        <div class="row">
          <div class="col text-center">
            <q-btn
              flat
              rounded
              dense
              class="text-blue-color"
              icon="add_circle"
              size="lg"
            />
          </div>
        </div>
        <q-carousel
          animated
          v-model="slide"
          transition-prev="slide-right"
          transition-next="slide-left"
          navigation
          swipeable
          height="220px"
          class="rmbg"
        >
          <q-carousel-slide
            v-for="(acc, index) in account"
            :key="index"
            :name="acc.id + 1"
          >
            <q-card square flat class="bg-grey-1 rmbg">
              <q-card-section>
                <div class="row q-mx-sm">
                  <q-card class="full-width">
                    <q-card-section>
                      <div class="row">Current Balance (THB)</div>
                      <div
                        v-if="acc.eye.status"
                        class="row text-subtitle1 text-bold q-mt-xs"
                      >
                        {{ acc.number }}
                      </div>
                      <div
                        v-if="!acc.eye.status"
                        class="row text-subtitle1 text-bold q-mt-xs"
                      >
                        xxxxxxxxxx
                      </div>
                      <div class="row text-bold text-h4 q-my-xs">
                        <div v-if="acc.eye.status" class="col">
                          {{ formatNum(acc.balance) }}
                        </div>
                        <div v-if="!acc.eye.status" class="col">--.--</div>
                        <div class="col text-right">
                          <q-icon
                            size="md"
                            :name="acc.eye.name"
                            @click="eyeClick(acc.id)"
                          />
                        </div>
                      </div>
                    </q-card-section>
                  </q-card>
                </div>
              </q-card-section>
            </q-card>
          </q-carousel-slide>
        </q-carousel>
        <q-card>
          <q-card-section>
            <div class="row">
              <div class="col-4">
                <div class="text-subtitle2">Bank Type</div>
                <div class="text-subtitle2">Account Name</div>
              </div>
              <div class="col-8">
                <div class="text-weight-light">{{ account[0].type }}</div>
                <div class="text-weight-light">{{ account[0].name }}</div>
              </div>
            </div>
          </q-card-section>
        </q-card>
        <div class="q-pa-md text-subtitle2">Transaction</div>
        <q-card
          v-for="(transfer, index) in transfers"
          :key="index"
          class="q-mx-md q-pa-md q-my-xs"
        >
          <div class="row">
            <div class="col">
              <div class="text-subtitle1 text-bold">{{ transfer.type }}</div>
            </div>
            <div class="col text-right">
              <div class="text-subtitle2">{{ transfer.date }}</div>
            </div>
          </div>

          <div class="row">
            <div class="col">
              <div class="text-subtitle1">{{ transfer.name }}</div>
            </div>
            <div class="col text-right">
              <div v-if="transfer.amount < 0" class="text-subtitle1 amount-red">
                {{ formatNum(transfer.amount) }}
              </div>
              <div
                v-if="transfer.amount > 0"
                class="text-subtitle1 amount-green"
              >
                {{ formatNum(transfer.amount) }}
              </div>
            </div>
          </div>
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
      const docs = doc.data();
      this.account[0].balance = docs.balance;
      this.account[0].number = docs.number;
      this.account[0].name = docs.name;
      this.account[0].type = docs.type;
    });

    const out = query(
      collection(this.$db, "transfers"),
      where("from", "==", String(this.account[0].name))
    );
    const out_data = await getDocs(out);
    out_data.forEach((doc) => {
      const docs = doc.data();
      const data = {
          type: "Transfer Out",
          amount: docs.amount*-1,
          name: docs.to,
          date: docs.date.seconds*1000,
        }
      this.transfers.push(data)
    });

    const ins = query(
      collection(this.$db, "transfers"),
      where("to", "==", String(this.account[0].name))
    );
    const in_data = await getDocs(ins);
    in_data.forEach((doc) => {
      const docs = doc.data();
      const data = {
          type: "Transfer In",
          amount: docs.amount,
          name: docs.from,
          date: docs.date.seconds*1000,
        }
      this.transfers.push(data)
    });

    await this.transfers.sort(function(a, b) {
      const dateA = new Date(a.date);
      const dateB = new Date(b.date);
      return dateB - dateA;
    });
    for (let index = 0; index < this.transfers.length; index++) {
      const datetime= new Date(this.transfers[index].date)
      const time = (datetime).toString().slice(4,24)
      console.log("🚀  time:", time)
      this.transfers[index].date=time

    }
  },
  components: {},
  data() {
    return {
      eye: { status: true, name: "visibility" },
      slide: 1,
      account: [
        {
          id: 0,
          number: null,
          balance: null,
          name: null,
          type: null,
          eye: { status: true, name: "visibility" },
        },
        {
          id: 1,
          number: 9886521456,
          balance: 2500.0,
          eye: { status: true, name: "visibility" },
        },
      ],
      transfers:[],
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
  },
};
</script>


