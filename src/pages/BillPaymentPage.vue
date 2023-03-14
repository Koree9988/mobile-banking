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
        <div class="text-subtitle1 q-mt-sm q-px-lg text-bold">To</div>
        <q-card style="border-radius: 20px 20px" class="q-mx-lg">
          <div class="row text-subtitle1 q-pa-md">
            <q-input
              class="col q-px-md text-subtitle1"
              v-model="providerName"
              type="text"
              :min="0"
              maxlength="10"
              :dense="true"
              label="Search name or provider number"
            />
          </div>
        </q-card>
        <q-card class="full-width fixed-bottom" style="height: 20rem">
          <q-card class="bg-gray-color">
            <div class="text-h6 q-px-md q-py-md " v-if="!!providerName">
              Providers
            </div>
            <div
              class="text-h6 q-px-md q-py-md"
              v-if="providerName == '' || providerName == null"
            >
              Top Service Providers
            </div>
          </q-card>
          <q-card v-if="!!providerName">
            <div class="row q-col-gutter-md q-mx-md">
              <div v-for="(list, idx) in provider" :key="idx">
                <div
                  class="col-3"
                  v-if="
                    list.name.includes(providerName) ||
                    list.code.includes(providerName)
                  "
                  @click="toRoute('/menu/conpaybill',list)"
                >
                  <div class="row">
                    <q-img
                      src="../../public/img/cc.png"
                      class="border-radious-50"
                      style="width: 65px"
                    />
                  </div>
                  <div class="row">
                    <div class="col text-center">{{ `${list.name}` }}</div>
                  </div>
                </div>
              </div>
            </div>
          </q-card>
          <q-card v-if="providerName == '' || providerName == null">
            <div class="row q-col-gutter-md q-mx-md">
              <div v-for="(list, idx) in provider" :key="idx">
                <div class="col-3" @click="toRoute('/menu/conpaybill',list)">
                  <div class="row">
                    <q-img
                      src="../../public/img/cc.png"
                      class="border-radious-50"
                      style="width: 65px"
                    />
                  </div>
                  <div class="row">
                    <div class="col text-center">{{ `${list.name}` }}</div>
                  </div>
                </div>
              </div>
            </div>
          </q-card>
        </q-card>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { collection, query, where, getDocs} from "firebase/firestore";

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
        balance: null,
        type: null,
        eye: { status: true, name: "visibility" },
      },
      providerName: null,
      provider: [
        { name: "AIS service", code: "121" },
        { name: "PSU Phuket", code: "855" },
        { name: "CC service", code: "933" },
        { name: "True com", code: "677" },
        { name: "Cat com", code: "344" },
      ],
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
    toRoute(routePath,data) {
      this.$router.push({
        path:routePath,
        query:{
          data:data
        }
      }

      );
    },


  },
};
</script>
