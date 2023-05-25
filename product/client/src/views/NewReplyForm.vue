<template>
  <div class="mb-5" :id="id">
    <div class="border rounded">
      <div class="toast-header">
        <strong class="me-auto">새로운 댓글 작성</strong>
        <button
          type="button"
          class="btn-close"
          aria-label="Close"
          @click="replyDelete()"
        ></button>
      </div>
      <div class="toast-body text-start border-top">
        <div class="form-floating">
          <textarea
            class="form-control border-0"
            placeholder="Leave a comment here"
            id="floatingTextarea2"
            style="height: 80px"
            v-model="rcontent"
          ></textarea>
          <label>댓글 달기.</label>
        </div>
      </div>
    </div>
    <div class="d-flex justify-content-end mt-1">
      <button
        type="button"
        class="btn btn-sm btn-primary rounded-2"
        @click="newReply2(replyList)"
      >
        작성
      </button>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      rList: {},
    };
  },
  props: {
    replyList: {
      type: Object,
    },
    id: {
      type: String,
    },
  },

  computed: {
    //값이 바뀔대마다 적용.
    user() {
      return this.$store.state.user;
    },
  },

  methods: {
    async newReply2(list) {
      let oriSort2 = list.sort2; //댓글을 달려는 댓글이 가지고 있는 댓글 수
      let sort = list.sort;
      let sort2 = list.sort2; //자식댓글갯수

      this.rList.rcontent = this.rcontent;
      this.rList.rdepth = list.rdepth + 1;
      this.rList.rpno = list.rno;
      this.rList.uno = 1;
      this.rList.bno = list.bno;
      this.rList.sort = sort;
      this.rList.sort2 = sort2;

      console.log(this.rList);

      console.log("sort2", sort2);
      console.log("sort2 && sort2 > 1): ", sort2 && sort2 > 1);

      if (this.rcontent) {
        console.log(this.rcontent);
      } else {
        console.log("내용없음");
      }
      if (sort2 && sort2 > 0) {
        console.log("대댓글이 있는 댓글에 추가댓글 다는 경우.");
        //대댓글이 있을 경우
        this.rList.sort = sort + "-" + (parseInt(sort2) + 1);
        this.rList.sort2 = null; //내 하위댓글은 없으니까.
        oriSort2 = oriSort2 + 1;
        console.log("원본sort2:", oriSort2, ",대상리플번호:", list.rno);
      } else {
        console.log("새로운 대댓글일경우");
        this.rList.sort2 = 1;
        this.rList.sort = list.sort + "-" + 1;
        oriSort2 = 1; //댓글을 달려는 상위댓글에 몇개댓글 달렸는지 카운트해줘야함
      }
      console.log("sort2", this.rList.sort2);
      console.log("sort", this.rList.sort);

      //원본 댓글에 자식 댓글 카운트
      //새로운 댓글 정보 업데이트
      await this.$api("/api/updateReplySort2", {
        param: [oriSort2, list.rno],
      }).then(() => {
        this.$api("/api/newReplysave", { param: [this.rList] });
        this.$router.go(0);
      });
      // this.$router.push({
      //   path: "/boardDetail",
      //   params: { bno: this.rList.bno },
      //   query: { bno: this.rList.bno },
      // });
    },
  },
};
</script>
