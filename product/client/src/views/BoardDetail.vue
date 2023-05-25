<template>
  <main class="mt-3">
    <div class="container">
      <div class="mt-3 row text-start">
        <h2>{{ boardDetail.btitle }}</h2>
      </div>
      <div class="mb-3 row text-start">
        <div class="row text-start">
          <div class="col-sm-6 col-md-12">
            {{ boardDetail.uname }} ({{ boardDetail.uemail }})
            <span class="badge rounded-pill text-bg-secondary">{{
              boardDetail.bhit
            }}</span>
          </div>
        </div>
      </div>

      <div class="mb-5 row border-top border-bottom" style="min-height: 300px">
        <div class="mt-3 col-md-12">
          <div class="text-start" v-html="description"></div>
        </div>
      </div>

      <!-- 버튼 -->
      <div v-if="boardDetail.uemail == this.user.email" class="mb-3 row">
        <div class="col-6 d-grid p-1">
          <button
            type="button"
            class="btn btn-lg btn-secondary"
            @click="goToDelete(boardDetail.bno)"
          >
            삭제하기
          </button>
        </div>
        <div class="col-6 d-grid p-1">
          <button
            type="button"
            class="btn btn-lg btn-danger"
            @click="goToUpdate(boardDetail.bno)"
          >
            수정하기
          </button>
        </div>
      </div>
      <div class="col-12 d-grid p-1">
        <button type="button" class="btn btn-lg btn-dark" @click="goToList">
          목록
        </button>
      </div>
      <!-- //버튼 -->

      <!-- reply -->
      <div class="mt-3 mb-3 row border-top">
        <reply-list :reply="boardDetail" />
      </div>
      <!-- //reply -->
    </div>
  </main>
</template>

<script>
import BoardReplyList from "./BoardReplyList.vue";

export default {
  components: { "reply-list": BoardReplyList },
  data() {
    return {
      bno: 0,
      myUno: 0,
      boardDetail: {},
      description: "",
      replyList: {},
    };
  },
  computed: {
    //값이 바뀔대마다 적용.
    user() {
      return this.$store.state.user;
    },
  },
  // mounted() { //BoardReplyList.vue 로 옮김. mounted() 는 자식>부모 순서로 호출
  //   if (this.user.email == undefined) {
  //     alert("로그인 후 이용해주세요.2");
  //     this.$router.push({ path: "/boardList" });
  //   }
  // },
  created() {
    this.bno = this.$route.query.bno;
    this.getBoardDetail();
  },

  methods: {
    goToList() {
      this.$router.push({ path: "/boardList" });
    },

    goToUpdate(bno) {
      console.log("update bno: ", bno);
      this.$router.push({
        path: "boardUpdate",
        query: { bno: bno },
      });
    },
    goToDelete(bno) {
      this.$swal
        .fire({
          title: "정말 삭제하시겠습니까?",
          showCancelButton: true,
          confirmButtonText: "네, 삭제합니다.",
          cancelButtonText: "아니요, 삭제하지 않습니다.",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            await this.$api("/api/boardDelete", {
              param: [bno],
            });
            this.$swal.fire("글이 삭제 되었습니다.", "", "info");
            this.$router.push({
              path: "/boardList",
            });
          }
        });
    },

    async getBoardDetail() {
      let boardDetail = await this.$api("/api/boardDetail", {
        param: [this.bno],
      });
      if (boardDetail.length > 0) {
        this.boardDetail = boardDetail[0];
      }
      this.description = this.boardDetail.bcontent.replace(
        /(?:\r\n|\r|\n)/g,
        "<br />"
      );
    },
  },
};
</script>
