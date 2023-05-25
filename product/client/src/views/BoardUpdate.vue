<template>
  <main class="mt-3">
    <div class="container">
      <div class="mt-3 row text-start">
        <input type="text" class="form-control" v-model="boardDetail.btitle" />
      </div>
      <div class="mb-3 row text-start">
        <div class="mt-3 row text-start">
          <div class="col-sm-6 col-md-12">
            {{ boardDetail.uname }}
            <span class="badge rounded-pill text-bg-secondary">{{
              boardDetail.bhit
            }}</span>
          </div>
        </div>
      </div>

      <div class="mb-5 row border-top border-bottom">
        <div class="mt-3 col-md-12">
          <div class="form-floating mb-3 text-start">
            <div class="form-floating">
              <textarea
                class="form-control mb-2"
                placeholder="글을 작성합니다."
                id="floatingTextarea"
                style="height: 400px"
                v-model="boardDetail.bcontent"
                wrap="hard"
              ></textarea>
              <label for="floatingTextarea">수정중입니다.</label>
            </div>
          </div>
        </div>
      </div>

      <div class="mb-3 row">
        <div class="col-6 d-grid p-1">
          <button type="button" class="btn btn-lg btn-dark" @click="goCancel">
            취소
          </button>
        </div>
        <div class="col-6 d-grid p-1">
          <button type="button" class="btn btn-lg btn-danger" @click="goSave">
            저장
          </button>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      bno: 0,
      bcontent: "",
      boardDetail: {},
    };
  },

  computed: {
    //값이 바뀔대마다 적용.
    user() {
      return this.$store.state.user;
    },
  },

  mounted() {
    if (this.user.email == undefined) {
      alert("로그인 후 이용해주세요.");
      this.$router.push({ path: "/" });
    }
  },

  created() {
    this.bno = this.$route.query.bno;
    this.getBoardDetail();
  },

  methods: {
    goCancel() {
      this.$swal
        .fire({
          title: "작성중이던 내용이 모두 삭제됩니다. 취소하시겠습니까?",
          icon: "warning",
          showCancelButton: true,
          confirmButtonText: "네, 취소합니다.",
          cancelButtonText: "아니요, 계속 작업합니다.",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            this.$swal.fire("작성이 취소 되었습니다.", "", "success");
            this.$router.push({
              path: "/boardDetail",
              params: { bno: this.bno },
              query: { bno: this.bno },
            });
          } else if (result.isDenied) {
            //this.$swal.fire('Changes are not saved', '', 'info')
          }
        });
    },

    async goSave() {
      console.log(this.boardDetail.bcontent);
      this.$swal
        .fire({
          title: "수정한 내용을 저장하시겠습니까?",
          showCancelButton: true,
          confirmButtonText: "저장합니다.",
          cancelButtonText: "아니요, 계속 작업합니다.",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            let boardDetail = await this.$api("/api/boardUpdate", {
              param: [
                this.boardDetail.btitle,
                this.boardDetail.bcontent,
                this.bno,
              ],
            });
            console.log(boardDetail);
            this.$swal.fire("작성이 완료되었습니다.", "", "success");
            this.$router.push({
              path: "/boardDetail",
              params: { bno: this.bno },
              query: { bno: this.bno },
            });
          } else if (result.isDenied) {
            //this.$swal.fire('Changes are not saved', '', 'info')
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
      console.log(this.boardDetail);
    },
  },
};
</script>
