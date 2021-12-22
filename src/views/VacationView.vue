<template>
  <v-card>
    <v-row no-gutters align="center">
      <v-col cols="12">
        <v-card-text class="text-center">
          {{ userInfo.userName }} 님의 남은 휴가 : {{ userInfo.vacation }}
        </v-card-text>
      </v-col>
    </v-row>
    <v-row no-gutters align="center">
      <requesting-vacation></requesting-vacation>
    </v-row>
    <v-row no-gutters align="center">
      <v-col cols="3">
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
      <v-col cols="3">
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
      <v-col cols="12">
        <v-data-table
          class="ove"
          v-model="selected"
          height="600px"
          :headers="headers"
          :items="vacationList"
          item-key="seqUser"
          calculate-widths
          show-select
          no-data-text="조회된 데이터가 없습니다."
          :footer-props="{
            'items-per-page-text': '페이지 당 데이터 개수',
            pagination: {
              itemPerPage: 10,
            },
          }"
        >
          <template v-slot:item.action="{ item }">
            <v-icon @click="deleteReceiver(item)">mdi-delete</v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import axios from "@/api/index";
import VueCookies from "vue-cookies";
import RequestingVacation from "@/components/RequestingVacation";
export default {
  data() {
    return {
      userInfo: {},
      vacationType: "",
      remainingVacation: 0,
      menuSDate: false,
      menuEDate: false,
      startDate: "",
      endDate: "",
      selected: [],
      vacationList: [],
      headers: [
        { text: "휴가 ID", value: "seq" },
        { text: "휴가 요청 시간", value: "requestTime" },
        { text: "휴가 시작일", value: "startDate" },
        { text: "휴가 시작일", value: "endDate" },
        { text: "삭제", value: "action", sortable: false },
      ],
    };
  },
  methods: {
    requestVacation() {
      axios;
    },
  },
  components: { RequestingVacation },
  computed: {},
  mounted() {
    this.userName = VueCookies.get("userName");
  },
  async created() {
    let vacations = await axios.get("/vacation");
    let userInfo = await axios.get("/user");
    this.vacationList = vacations.data.result;
    this.userInfo = userInfo.data.result;
    console.log(vacations);
    console.log(this.userInfo);
  },
};
</script>
