<template>
  <v-dialog
    v-model="dialog"
    max-width="1000"
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <template v-slot:activator="{ on, attrs }">
      <v-btn class="mx-auto" depressed v-bind="attrs" v-on="on">
        <v-icon class="mr-2">mdi-car</v-icon> 우리 여행가요!
      </v-btn>
    </template>

    <v-card outlined height="500">
      <v-row no-gutters>
        <v-col cols="12">
          <v-parallax
            class="ma-0 pa-0"
            src="https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg"
            height="15%"
          >
            <v-row no-gutters align="center">
              <v-col cols="11">
                <v-card-title>행복한 연차 신청하기!</v-card-title>
              </v-col>
              <v-col class="text-right" cols="1">
                <v-btn
                  text
                  @click="dialog = false"
                  width="auto"
                  height="auto"
                  plain
                >
                  <v-icon x-large>mdi-chevron-double-down</v-icon>
                </v-btn>
              </v-col>
            </v-row>
          </v-parallax>
        </v-col>

        <v-col cols="12">
          <v-radio-group v-model="vacationType" row dense mandatory>
            <v-radio label="연차" value="ANNUAL"></v-radio>
            <v-radio label="반차" value="HALFDAY"></v-radio>
            <v-radio label="반반차" value="HALFHALFDAY"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "@/api/index";
// import VueCookies from "vue-cookies";
export default {
  data() {
    return {
      dialog: false,
      tab: null,
      vacationType: "",
    };
  },
  methods: {
    registVacation() {
      axios.post;
    },
  },
};
</script>
