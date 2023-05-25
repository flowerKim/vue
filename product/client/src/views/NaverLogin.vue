<template>
  <div>
    <!-- 네이버 로그인 버튼 노출 영역 -->
    <div id="naverIdLogin"></div>
    <button type="button" @click="logout">로그아웃</button>
  </div>
</template>
<script>
export default {
  data() {
    return {
      naverLogin: null,
      logoutResult: {},
    };
  },
  mounted() {
    // //로그인 버튼 만들기
    this.naverLogin = new window.naver.LoginWithNaverId({
      clientId: "PxRK8yheY6UPbDBuUKfk",
      callbackUrl: "http://192.168.50.77:8080/",
      isPopup: false,
      loginButton: { color: "green", type: 3, height: 60 },
    });
    this.naverLogin.init();

    this.naverLogin.getLoginStatus((status) => {
      if (status) {
        console.log("상태: ", status);
        console.log(this.naverLogin.user);
        //필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크
        var email = this.naverLogin.user.getEmail();
        if (email == undefined || email == null) {
          alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
          //사용자 정보 재동의를 위ㅏㅎ여 다시 네이버아이디 동의페이지로 이동함
          this.naverIdLogin.reprompt();
          return;
        }
      } else {
        console.log("callback 처리에 실패하였습니다.");
      }
    });
  },
  methods: {
    async logout() {
      const accessToken = this.naverLogin.accessToken.accessToken;
      const url = `/oauth2.0/token?grant_type=delete&client_id=PxRK8yheY6UPbDBuUKfk&client_secret=gGycDxvdNL&access_token=${accessToken}&service_provider=NAVER`;

      console.log(url);

      this.logoutResult = await this.$api(url, {});
      console.log(this.logoutResult);
    },
  },
};
</script>
