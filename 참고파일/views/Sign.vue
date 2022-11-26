<template>
  <div class="app">
    <div v-if="state.account.id">
      <p>안녕하세요, {{state.account.name}}님</p>
      <button @click="logout()">로그아웃</button>
      <router-view></router-view>
    </div>
    <div v-else>
      <label for="loginId">
        <span>아이디</span>
        <input type="text" id="loginId" v-model="state.form.loginId" />
      </label>
      <label for="loginPw">
        <span>패스워드</span>
        <input type="password" id="loginPw" v-model="state.form.loginPw" />
      </label>
      <label for="loginName">
        <span>사용자 닉네임</span>
        <input type="text" id="loginName" v-model="state.form.loginName" />
      </label>
      <hr />
      <button @click="submit()">회원가입</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {reactive} from "vue";

export default {
  setup() {
    const state = reactive({
      account: {
        id: null,
        name: '',
      },
      // 로그인 정보를 보내주기 위해
      form: {
        loginId: "",
        loginPw: "",
        loginName: "",
      },
    });

    const submit = () => {
      const args = {
        loginId: state.form.loginId,
        loginPw: state.form.loginPw,
        loginName: state.form.loginName
      };
      axios.post("/api/maccount", args).then((res) => {
        alert("회원가입에 성공했습니다.");
        state.account = res.data;
      })
      .catch(()=> {
        alert("회원가입에 실패했습니다.");
      });
    };

    const logout = () => {
      axios.delete("/api/account").then(() => {   // 성공하면 응답값을 보여줘
        alert("로그아웃하였습니다.");
        state.account.id = null;
        state.account.name = "";
      });
    };

    axios.get("/api/account").then((res) => {   // 성공하면 응답값을 보여줘
      state.account = res.data;
    });

    return {state, submit, logout};
  },
};
</script>

