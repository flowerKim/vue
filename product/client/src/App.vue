<template>
  <div>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
      <div class="container-fluid">
        <!-- <a class="navbar-brand" href="/">PND Tech </a> -->
        <router-link class="navbar-brand" to="/"> PND Tech </router-link>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">
          <!-- {{ this.user }} -->
          <ul class="navbar-nav me-auto mb-2 mb-lg-0 align-items-center">
            <li class="nav-item">
              <router-link class="nav-link" aria-current="page" to="/"
                >홈</router-link
              >
            </li>
            <li class="nav-item">
              <router-link class="nav-link active" to="/boardList"
                >게시판</router-link
              >
            </li>

            <li class="nav-item">
              <router-link class="nav-link active" to="/about"
                >about</router-link
              >
            </li>
          </ul>

          <form class="d-flex me-2" role="search">
            <input
              class="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
              v-model="searchTxt"
            />
            <button
              class="btn btn-outline-success"
              type="button"
              @click="searchBtn()"
            >
              Search
            </button>
          </form>

          <div class="d-flex align-items-center ms-3">
            <!-- 카카오 로그인 버튼 노출 영역 -->
            <div v-if="user.email == undefined && !user.logingubun">
              <div @click="kakaoLogin">
                <img
                  src="../../html/img/kakao_login_medium_narrow.png"
                  alt="카카오 로그인"
                  height="37"
                />
              </div>
            </div>
            <!-- //카카오 로그인 버튼 노출 영역 -->
            <!-- 네이버 로그인 버튼 노출 영역 -->
            <div v-show="user.email == undefined && !user.logingubun">
              <div id="naverIdLogin" class="btn"></div>
            </div>
            <!-- //네이버 로그인 버튼 노출 영역 -->

            <div v-if="user.email">
              <div class="text-light text-opacity-75 me-2">
                반갑습니다! {{ user.nickname }} 님
              </div>
            </div>

            <div v-if="user.logingubun == 'kakao'">
              <button class="btn btn-danger" type="button" @click="logoutKaKao">
                로그아웃
              </button>
            </div>
            <div v-if="user.logingubun == 'naver'">
              <button class="btn btn-danger" type="button" @click="logoutNaver">
                로그아웃
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>

    <router-view />

    <!-- footer -->
    <div class="container">
      <footer class="py-3 my-4">
        <ul class="nav justify-content-center border-bottom pb-3 mb-3">
          <li class="nav-item">
            <a href="/boardList" class="nav-link px-2 text-muted">Home</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-muted">Features</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-muted">Pricing</a>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link px-2 text-muted">FAQs</a>
          </li>
          <li class="nav-item">
            <a href="/boardList" class="nav-link px-2 text-muted">About</a>
          </li>
        </ul>
        <p class="text-center text-muted">&copy; 2023 Company, Inc</p>
      </footer>
    </div>
    <!-- //footer -->
  </div>
</template>
<script>
export default {
  data() {
    return {
      searchTxt: "",
      naverLogin: null,
      email: "",
      nickname: "",
      logoutResult: {},
      testPopUp: null,
      clientId: "PxRK8yheY6UPbDBuUKfk",
      logingubun: "",
    };
  },
  computed: {
    //값이 바뀔대마다 적용.
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
    //네이버 로그인 버튼 만들기
    this.naverLogin = new window.naver.LoginWithNaverId({
      clientId: this.clientId,
      callbackUrl: "http://192.168.50.77:8080/",
      isPopup: false,
      loginButton: { color: "green", type: 3, height: 37 },
    });
    this.naverLogin.init();
    this.naverLogin.getLoginStatus((status) => {
      if (status) {
        console.log("네이버 로그인 상태: ", status);
        console.log("네이버 로그인 정보", this.naverLogin.user);
        this.logingubun = "naver";
        //필수적으로 받아야하는 프로필 정보가 있다면 callback처리 시점에 체크
        var email = this.naverLogin.user.getEmail();
        if (email == undefined || email == null) {
          alert("이메일은 필수정보입니다. 정보제공을 동의해주세요.");
          //사용자 정보 재동의를 위ㅏㅎ여 다시 네이버아이디 동의페이지로 이동함
          this.naverIdLogin.reprompt();
          return;
        } else {
          const accountInfo = this.naverLogin.user;
          this.email = accountInfo.email;
          this.nickname = accountInfo.nickname;
          accountInfo.profile = {
            nickname: this.nickname,
          };
          this.login(accountInfo);
        }
      } else {
        console.log("callback 처리에 실패하였습니다.");
      }
    });
  },

  methods: {
    kakaoLogin() {
      //index.html에 kakao sdk 추가해놨는데, 거기서 제공하는 함수로 사용해서 쓰는것임.
      window.Kakao.Auth.login({
        scope: "profile_nickname, profile_image, account_email", //카카오에서 내가 동의항목 설정한 범위를 말함,
        // success: function (response) {
        //   console.log(response);
        // },
        // fail: function (error) {
        //   console.log(error);
        // },
        success: this.getKakaoAccout,
      });
    },
    getKakaoAccout(authObj) {
      console.log(authObj);
      window.Kakao.API.request({
        //사용자정보를 읽어오갰다고 요청하는것
        url: "/v2/user/me",
        success: (res) => {
          //로그인정보를 얻어오면, 리스판스(res) 속에 정보가 들어있는 것이죠.
          const kakao_account = res.kakao_account;
          this.logingubun = "kakao";
          this.login(kakao_account);
          alert("로그인 성공!");
        },
      });
    },
    async login(accountInfo) {
      this.email = accountInfo.email;
      this.nickname = accountInfo.profile.nickname;

      await this.$api("/api/login", {
        param: [
          {
            uemail: this.email,
            uname: this.nickname,
            logingubun: this.logingubun,
          },
          { uemail: this.email },
        ],
      });
      let myUno = await this.$api("/api/myUnoInfo", {
        param: [this.email],
      });
      accountInfo.uno = myUno[0].uno;
      accountInfo.logingubun = this.logingubun;
      this.$store.commit("user", accountInfo);
    },

    logoutKaKao() {
      window.Kakao.Auth.logout((response) => {
        console.log("response===>", response);
        this.$store.commit("user", {});
        alert("logout");
      });

      window.Kakao.API.request({
        url: "/v1/user/unlink",
        success: function (response) {
          console.log(response);
        },
        fail: function (error) {
          console.log(error);
        },
      });
      window.Kakao.Auth.setAccessToken(undefined);
    },

    //naver 로그아웃
    async logoutNaver() {
      this.$store.commit("user", {});
      const accessToken = this.naverLogin.accessToken.accessToken;
      const url = `/oauth2.0/token?grant_type=delete&client_id=${this.clientId}&client_secret=gGycDxvdNL&access_token=${accessToken}&service_provider=NAVER`;
      this.logoutResult = await this.$apiNaver(url, {});

      console.log("logout을 시전했습니다.");

      this.naverLogin.logout();
      console.log(this.naverLogin);
    },

    searchBtn() {
      this.$router.push({
        path: "boardSearchList",
        query: { btitle: this.searchTxt },
      });
    },
  },
};
</script>
