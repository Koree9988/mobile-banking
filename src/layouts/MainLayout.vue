<template>
  <q-layout view="lHh Lpr lFf" >
    <q-page-container>
      <router-view />
      <q-footer bordered class="bg-white text-primary">
        <q-tabs no-caps active-color="primary" indicator-color="primary" class="text-grey"  style="z-index: 1;">
          <q-tab @click="goToPage('/menu/home')">
            <q-icon name="home" size="md"/>
          </q-tab>
          <q-tab @click="goToPage('/menu/wallet')">
            <q-icon name="mdi-wallet" size="md"/>
          </q-tab>

          <q-tab @click="goToPage('/menu/qrscan')">
            <q-icon name="mdi-qrcode-scan" size="lg"/>
          </q-tab>

          <q-tab @click="goToPage('/menu/services')">
            <q-icon name="mdi-widgets" size="md"/>
          </q-tab>
          <q-tab @click="goToPage('/menu/setting')">
            <q-icon name="mdi-cog" size="md"/>
          </q-tab>
        </q-tabs>
      </q-footer>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  components: {

  },
  data () {
    return {

    }
  },methods:{
    goToPage(name){
      this.$router.push(name);
    }
  }
}
</script>
