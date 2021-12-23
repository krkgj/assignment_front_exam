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
import RequestingVacation from "@/components/vacation/RequestingVacation";
export default {
  data() {
    return {
      userInfo: {},
      vacationType: "",
      remainingVacation: 0,

      selected: [],
      vacationList: [],
      headers: [
        { text: "휴가 신청 ID", value: "seq" },
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
