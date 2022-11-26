<template>
  <div class="app">
    <div v-if="state.account.id">
      <p>{{state.account.name}}님의 회원가입이 완료되었습니다</p>
      <button @click="logout()">로그인페이지로 가기</button>
    </div>
    <div v-else>
      <label for="signId">
        <span>아이디</span>
        <input type="text" id="signId" v-model="state.form.signId" />
      </label>
      <label for="signPw">
        <span>패스워드</span>
        <input type="password" id="signPw" v-model="state.form.signPw" />
      </label>
      <label for="signName">
        <span>사용자 닉네임</span>
        <input type="name" id="signName" v-model="state.form.signName" />
      </label>
      <hr />
      <button @click="signUp()">회원가입</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import {reactive} from "vue";

export default{
  setup() {
    const state = reactive({
      account: {
        id: null,
        name: '',
      },
      // 회원가입 정보를 보내주기 위해서
      form: {
        signId: "",
        signPw: "",
        signName: "",
      }
    });

    const signUp = () => {
        const args = {
            signId: state.form.signId,
            signName: state.form.signName,
            signPw: state.form.signPw
        };
        axios.post("/api/members", {signId:signId, signPw:signPw, signName:signName}).then((res) => {
            alert("회원가입에 성공했습니다.");
            state.account = res.data;
        })
        .catch(()=> {
            alert("회원가입에 실패했습니다.");
        });
    };

    const logout = () => {
      axios.delete("/api/account").then(() => {   // 성공하면 응답값을 보여줘
        alert("로그인창으로 이동합니다.");
        state.account.id = null;
        state.account.name = "";
      });
    };

    axios.get("/api/members").then((res) => {   // 성공하면 응답값을 보여줘
            state.account = res.data;
        });
        
        return {state, signUp, logout};
  },
};
</script>