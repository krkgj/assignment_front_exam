<template>
  <v-card>
    <common-snack-bar
      :discriminant="snackDiscriminant"
      :text="snackText"
      :color="snackColor"
    />
    <v-row no-gutters justify="center">
      <v-dialog v-model="dialog" persistent max-width="550">
        <v-card>
          <v-row no-gutters>
            <v-card-title class="text-h5">
              휴가 취소... 정말 하시겠습니까..?
            </v-card-title>
            <v-col cols="12"><v-divider></v-divider></v-col>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                @click="[(dialog = false), realDeleteTT()]"
              >
                눈물을 머금은 휴가취소
              </v-btn>
              <v-spacer></v-spacer>
              <v-btn
                color="green darken-1"
                text
                @click="[(dialog = false), noDelete()]"
              >
                난 그냥 휴가 갈래
              </v-btn>
            </v-card-actions>
          </v-row>
        </v-card>
      </v-dialog>
    </v-row>
    <v-row no-gutters align="center">
      <v-col cols="12">
        <v-card-text class="text-center">
          {{ userInfo.userName }} 님의 남은 휴가 : {{ userInfo.vacation }}
        </v-card-text>
      </v-col>
    </v-row>
    <v-row no-gutters align="center">
      <requesting-vacation
        @remainingVacations="userInfoVacationChange"
        @refreshVacationsList="refreshVacationsList"
        @toggleSnackBar="toggleSnackBars"
      ></requesting-vacation>
    </v-row>

    <v-row no-gutters>
      <v-col cols="12">
        <v-data-table
          v-model="selected"
          height="600px"
          :headers="headers"
          :items="vacationList"
          item-key="seqUser"
          calculate-widths
          no-data-text="조회된 데이터가 없습니다."
          :footer-props="{
            'items-per-page-text': '페이지 당 데이터 개수',
            pagination: {
              itemPerPage: 10,
            },
          }"
        >
          <template v-slot:item.action="{ item }">
            <v-icon @click="isDeleteVacation(item)">mdi-delete</v-icon>
          </template>
          <template v-slot:item.vacationType="{ item }">
            {{ vacationTypeInKorea(item.vacationType) }}
          </template>
          <template v-slot:item.requestTime="{ item }">
            {{ parsingRequestTime(item.requestTime) }}
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import axios from "@/api/index";
import VueCookies from "vue-cookies";
import RequestingVacation from "@/components/vacation/RequestingVacation";
import CommonSnackBar from "@/components/common/CommonSnackBar.vue";

export default {
  data() {
    return {
      userInfo: {},
      vacationType: "",
      remainingVacation: 0,
      deleteItem: "",
      dialog: false,
      selected: [],
      vacationList: [],
      headers: [
        { text: "휴가 신청 ID", value: "seq" },
        { text: "휴가 요청 시간", value: "requestTime" },
        { text: "휴가 종류", value: "vacationType" },
        { text: "휴가 시작일", value: "startDate" },
        { text: "휴가 시작일", value: "endDate" },
        { text: "삭제", value: "action", sortable: false },
      ],
      isLoading: false,
      snackDiscriminant: false,
      snackText: "",
      snackColor: "#424242",
    };
  },
  methods: {
    vacationTypeInKorea(type) {
      if (type === "DAYOFF") return "연차";
      else if (type === "HALFDAYOFF") return "반차";
      else return "반반차";
    },
    parsingRequestTime(requestTime) {
      let year = requestTime.replace("T", " ").substring(0, 4);
      let month = requestTime.replace("T", " ").substring(5, 7);
      let day = requestTime.replace("T", " ").substring(8, 10);
      let hour = requestTime.replace("T", " ").substring(11, 13);
      let minute = requestTime.replace("T", " ").substring(14, 16);
      let second = requestTime.replace("T", " ").substring(17, 19);

      return (
        year +
        "년 " +
        month +
        "월 " +
        day +
        "일 " +
        hour +
        "시 " +
        minute +
        "분 " +
        second +
        "초"
      );
    },
    userInfoVacationChange(remainingVacations) {
      this.userInfo.vacation = remainingVacations;
    },
    refreshVacationsList(vacationsList) {
      this.vacationList = vacationsList;
    },
    isDeleteVacation(item) {
      this.deleteItem = item;
      this.dialog = true;
    },
    toggleSnackBars(text) {
      this.snackColor = "#424242";
      this.snackDiscriminant = !this.snackDiscriminant;
      this.snackText = text;
    },
    async realDeleteTT() {
      let requestData = this.deleteItem;
      let result = await axios.delete("/vacation/" + requestData.seq);
      let vacations = await axios.get("/vacation");
      this.vacationList = vacations.data.result;

      let resultCode = result.data.code;
      if (resultCode === "200") {
        this.toggleSnackBars("휴가가 취소되었어요😭😭");
      } else {
        this.toggleSnackBars("이미 시작하신 휴가가 아닐까요? 🤔");
      }
    },
    noDelete() {
      this.deleteItem = "";
      console.log(this.deleteItem);
    },
  },
  components: { RequestingVacation, CommonSnackBar },
  computed: {},
  mounted() {
    this.userName = VueCookies.get("userName");
  },
  async created() {
    let vacations = await axios.get("/vacation");
    let userInfo = await axios.get("/user");
    let vacationLists = vacations.data.result;
    console.log(vacations);
    console.log(userInfo);
    this.vacationList = vacationLists;
    this.userInfo = userInfo.data.result;
  },
};
</script>
