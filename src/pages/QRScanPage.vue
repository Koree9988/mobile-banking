<template>
  <q-page>
    <div>
      <q-card square flat class="blue-color-top">
        <q-card-section class="row q-my-auto absolute-bottom-left">
          <div class="col">
            <q-btn flat class="text-white">
              <q-icon
                round
                size="2rem"
                name="arrow_back_ios"
                class="text-white"
                @click="toRoute('/menu/home')"
              />
              Back
            </q-btn>
          </div>
        </q-card-section>
      </q-card>

      <q-card square flat class="bg-grey-14" style="height: 1.3rem"></q-card>


      <q-card class="opacity-80" style="height:78vh">
        <div class="row flex absolute-center full-width">
          <StreamBarcodeReader
          @decode="onDecode"
          @loaded="onLoaded"
        ></StreamBarcodeReader>
        </div>
      </q-card>
    </div>
  </q-page>
</template>

<script>
import { StreamBarcodeReader } from "vue-barcode-reader";
export default {
  components: { StreamBarcodeReader },
  data() {
    return {
      qrLink: "",
    };
  },
  methods: {
    onDecode(text) {
      // const datat = JSON.parse(text);
      console.log(text)
      this.$router.push({
        path: "/menu/qrtransfer",
        query: {
          data:text,
        },
      });
    },
    onLoaded() {
      console.log(`Ready to start scanning barcodes`);
    },
    toRoute(pathName){
      this.$router.push(pathName)
    }
  },
};
</script>
