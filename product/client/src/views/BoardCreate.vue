<template>
  <main class="mt-3">
    <div class="container">
      <div class="mt-3 row text-start">
        <input type="text" class="form-control" v-model="boardCreate.btitle" />
      </div>
      <div class="mb-3 row text-start">
        <div class="mt-3 row text-start">
          <div v-if="this.user.email != undefined" class="col-sm-6 col-md-12">
            {{ this.user.profile.nickname }}
            <!-- <span class="badge rounded-pill text-bg-secondary">작성자 </span> -->
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
                v-model="boardCreate.bcontent"
                wrap="hard"
              ></textarea>
              <label for="floatingTextarea">내용을 작성해주세요.</label>
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
      boardCreate: { btitle: "", bcontent: "", uno: 0 },
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
    this.boardCreate.uno = this.user.uno;
  },

  methods: {
    goCancel() {
      this.$swal
        .fire({
          title: "작성중이던 내용이 모두 삭제됩니다. 취소하시겠습니까?",
          showCancelButton: true,
          confirmButtonText: "네, 취소합니다.",
          cancelButtonText: "아니요, 계속 작업합니다.",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            //this.$swal.fire("작성이 취소 되었습니다.", "", "success");
            this.$router.push({ path: "/boardList" });
          }
        });
    },

    async goSave() {
      console.log(this.boardCreate);
      this.$swal
        .fire({
          title: "저장하시겠습니까?",
          showCancelButton: true,
          confirmButtonText: "저장합니다.",
          cancelButtonText: "아니요, 계속 작업합니다.",
        })
        .then(async (result) => {
          if (result.isConfirmed) {
            let boardCreate = await this.$api("/api/boardCreate", {
              param: [this.boardCreate],
            });
            console.log(boardCreate);
            this.$swal.fire("작성이 완료되었습니다.", "", "success");
            this.$router.push({ path: "/boardList" });
          } else if (result.isDenied) {
            //this.$swal.fire('Changes are not saved', '', 'info')
          }
        });
    },

    //     async getboardCreate() {
    //       let boardCreate = await this.$api("/api/boardCreate", {
    //         param: [this.bno],
    //       });
    //       if (boardCreate.length > 0) {
    //         this.boardCreate = boardCreate[0];
    //       }
    //       console.log(this.boardCreate);
    //     },
  },
};
</script>
