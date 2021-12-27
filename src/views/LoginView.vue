<template>
  <v-card max-width="auto" height="100%" elevation="0">
    <v-row no-gutters align="center">
      <!-- TITLE -->
      <v-col cols="12">
        <v-card-title class="text-h6 px-auto justify-center">
          로그인
        </v-card-title>
      </v-col>
      <!-- divider -->
      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>
      <!-- id password -->
      <v-col cols="12" md="9">
        <v-row no-gutters align="center">
          <v-col cols="5" md="4">
            <v-card-text class="text-center text-subtitle-2">
              아이디
            </v-card-text>
          </v-col>
          <v-col cols="6" md="7">
            <v-text-field v-model="id"></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-divider></v-divider>
          </v-col>
          <v-col cols="5" md="4">
            <v-card-text class="text-center text-subtitle-2" type="password">
              비밀번호
            </v-card-text>
          </v-col>
          <v-col cols="6" md="7">
            <v-text-field v-model="password" type="password"></v-text-field>
          </v-col>
        </v-row>
      </v-col>
      <v-col cols="12" md="3" class="text-center">
        <v-btn
          class="hidden-md-and-up mb-4"
          min-width="80%"
          @click="[(isLoading = true), login()]"
        >
          <div v-if="!isLoading">로그인</div>
          <v-progress-circular
            indeterminate
            color="primary"
            v-else
          ></v-progress-circular>
        </v-btn>
        <v-btn
          class="hidden-sm-and-down"
          height="120px"
          min-width="80%"
          @click="[(isLoading = true), login()]"
        >
          <div v-if="!isLoading">로그인</div>
          <v-progress-circular
            indeterminate
            color="primary"
            v-else
          ></v-progress-circular>
        </v-btn>
      </v-col>

      <v-col cols="12">
        <v-divider></v-divider>
      </v-col>

      <v-col cols="12">
        <v-alert dense outlined type="error" v-if="notFound">
          {{ "아이디 혹은 비밀번호를 확인 후 다시 입력해주세요." }}
        </v-alert>
      </v-col>
    </v-row>
    <v-card-actions>
      <v-spacer></v-spacer>
      <v-checkbox v-model="isSaved" :label="`나를 기억해줘!`"></v-checkbox>

      <v-spacer></v-spacer>
      <v-btn text>아이디/비밀번호 찾기</v-btn>

      <v-spacer></v-spacer>
      <v-btn text> 닫기 </v-btn>
      <v-spacer></v-spacer>
    </v-card-actions>
  </v-card>
</template>
<script>
import axios from "@/api/index";
import VueCookies from "vue-cookies";
export default {
  data() {
    return {
      id: "",
      password: "",
      isLoading: false,
      notFound: false,
      isSaved: false,
    };
  },
  methods: {
    async login() {
      let loginData = {
        id: this.id,
        password: this.password,
      };
      let result = await axios.post("/login/token", loginData, {
        // headers: { "Content-Type": `application/json` },
        // withCredentials: true,
      });
      this.isLoading = false;

      VueCookies.set("accessToken", result.data.accessToken);
      // VueCookies.set("refreshToken", result.data.refreshToken);
      VueCookies.set("userName", result.data.userName);

      if (result.data.code === "200") this.$router.push({ path: "/vacation" });
    },
  },
};
</script>
