<template>
  <v-dialog
    v-model="dialog"
    max-width="1000"
    hide-overlay
    transition="dialog-bottom-transition"
  >
    <common-loading-modal :is-loading="isLoading" />
    <common-snack-bar
      :discriminant="snackDiscriminant"
      :text="snackText"
      :color="snackColor"
    />
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
                <v-card-subtitle>
                  <v-icon class="mr-1">mdi-alert-circle</v-icon>
                  항목은 필수 항목입니다.
                </v-card-subtitle>
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
        <v-col cols="3">
          <v-card-title>
            <v-icon class="mr-2">mdi-alert-circle</v-icon>
            휴가 선택
          </v-card-title>
        </v-col>
        <v-col cols="9">
          <v-radio-group v-model="vacationType" row dense mandatory>
            <v-radio label="연차" value="DAYOFF"></v-radio>
            <v-radio label="반차" value="HALFDAYOFF"></v-radio>
            <v-radio label="반반차" value="HALFHALFDAYOFF"></v-radio>
          </v-radio-group>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12"><v-divider></v-divider></v-col>
      </v-row>
      <v-row no-gutters align="center">
        <v-col cols="12">
          <v-card-title>
            <v-icon class="mr-2">mdi-alert-circle</v-icon>
            휴가 날짜 선택
          </v-card-title>
        </v-col>
      </v-row>
      <v-row no-gutters align="center" justify="center">
        <v-col cols="auto">
          <v-menu
            v-model="menuSDate"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="startDate"
                label="휴가 시작날짜"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              locale="ko-kr"
              v-model="startDate"
              @input="menuSDate = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
        <v-col cols="2" class="text-center">~</v-col>
        <v-col cols="auto">
          <v-menu
            v-model="menuEDate"
            :close-on-content-click="false"
            :nudge-right="40"
            transition="scale-transition"
            offset-y
            min-width="auto"
          >
            <template v-slot:activator="{ on, attrs }">
              <v-text-field
                v-model="endDate"
                label="휴가 종료날짜"
                prepend-icon="mdi-calendar"
                readonly
                v-bind="attrs"
                v-on="on"
              ></v-text-field>
            </template>
            <v-date-picker
              locale="ko-kr"
              v-model="endDate"
              @input="menuEDate = false"
            ></v-date-picker>
          </v-menu>
        </v-col>
      </v-row>
      <v-row no-gutters>
        <v-col cols="12"><v-divider></v-divider></v-col>
      </v-row>
      <v-row no-gutters align="center">
        <v-col cols="12">
          <v-card-title>
            <v-icon class="mr-2">mdi-chevron-right</v-icon>
            코멘트 입력
          </v-card-title>
        </v-col>
        <v-col cols="12">
          <v-text-field
            v-model="comment"
            class="ma-0 px-3"
            label="코멘트 입력!"
            hide-details
            outlined
          ></v-text-field>
        </v-col>
      </v-row>
      <v-card-actions>
        <v-spacer /><v-btn @click="[(isLoading = !isLoading), registVacation()]"
          >놀러가보자구~!</v-btn
        >
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import axios from "@/api/index";
import CommonLoadingModal from "@/components/common/CommonLoadingModal.vue";
import CommonSnackBar from "@/components/common/CommonSnackBar.vue";
// import VueCookies from "vue-cookies";
export default {
  data() {
    return {
      dialog: false,
      tab: null,
      vacationType: "",
      menuSDate: false,
      menuEDate: false,
      startDate: "",
      endDate: "",
      comment: "",
      isLoading: false,
      snackDiscriminant: false,
      snackText: "",
      snackColor: "#424242",
    };
  },
  components: { CommonLoadingModal, CommonSnackBar },
  methods: {
    async registVacation() {
      let vacationData = {
        startDate: this.startDate,
        endDate: this.endDate,
        vacationType: this.vacationType,
        comment: this.comment,
      };

      let result = await axios
        .post("/vacation", vacationData)
        .then(() => {
          this.isLoading = false;
          this.snackColor = "#424242";
          this.snackDiscriminant = !this.snackDiscriminant;
          this.snackText = "휴가 등록이 완료되었습니다";
        })
        .catch(() => {
          this.isLoading = false;
          this.snackColor = "#B71C1C";
          this.snackDiscriminant = !this.snackDiscriminant;
          this.snackText =
            "휴가 등록이 실패하였습니다. 관리자에게 문의해주세요.";
        });

      console.log(result);
    },
  },
};
</script>
