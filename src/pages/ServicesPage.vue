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
      <q-card class="opacity-80" style="height:78vh">
          <div class="row q-mx-md ">
            <q-card class="q-my-xl bg-white full-width" style="height: 180px">
              <!-- <q-card-section>
                <div class="row">ADs</div>
              </q-card-section> -->
              <q-img src="../../public/img/Travel insurance.png" style="height: 180px"/>
            </q-card>
          </div>
          <div class="row q-mx-sm q-my-xl">
            <q-card class="col text-center q-my-md q-mx-sm main-icon" @click="toRoute('/menu/transfer')">
              <q-icon
                round
                size="2.5rem"
                name="mdi-bank-transfer"
                class="bg-white text-blue-color"
              />
              <div class="menu-text text-bold">Transfer</div>
            </q-card>
            <q-card class="col text-center q-my-md q-mx-sm main-icon" >
              <q-icon
                round
                size="2.5rem"
                name="mdi-plus-circle"
                class="bg-white text-blue-color"
              />
              <div class="menu-text text-bold">Top Up</div>
            </q-card>
            <q-card class="col text-center q-my-md q-mx-sm main-icon"  @click="toRoute('/menu/paybill')">
              <q-icon
                round
                size="2.5rem"
                name="mdi-script-text"
                class="bg-white text-blue-color"
              />
              <div class="menu-text text-bold">Pay Bills</div>
            </q-card>
            <q-card class="col text-center q-my-md q-mx-sm main-icon">
              <q-icon
                round
                size="2.5rem"
                name="mdi-file-download"
                class="bg-white text-blue-color"
              />
              <div class="menu-text text-bold">Statement</div>
            </q-card>
          </div>
          <div class="row q-ma-md"></div>

      </q-card>
    </div>
  </q-page>
</template>

<script>
export default {
  components: {},
  data() {
    return {
      balance: 3000.25,
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
  },
};
</script>
