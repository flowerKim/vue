<template>
  <div>
    <main class="mt-3">
      <div class="container mb-3">
        <div class="mb-5">
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
              @click="newReply()"
            >
              작성
            </button>
          </div>
        </div>

        <div class="mb-3" :key="i" v-for="(list, i) in replyList">
          <div :style="sty[list.rdepth]">
            <div class="border rounded">
              <div class="toast-header">
                <div class="me-1">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    fill="currentColor"
                    class="bi bi-reply"
                    viewBox="0 0 16 16"
                  >
                    <path
                      d="M6.598 5.013a.144.144 0 0 1 .202.134V6.3a.5.5 0 0 0 .5.5c.667 0 2.013.005 3.3.822.984.624 1.99 1.76 2.595 3.876-1.02-.983-2.185-1.516-3.205-1.799a8.74 8.74 0 0 0-1.921-.306 7.404 7.404 0 0 0-.798.008h-.013l-.005.001h-.001L7.3 9.9l-.05-.498a.5.5 0 0 0-.45.498v1.153c0 .108-.11.176-.202.134L2.614 8.254a.503.503 0 0 0-.042-.028.147.147 0 0 1 0-.252.499.499 0 0 0 .042-.028l3.984-2.933zM7.8 10.386c.068 0 .143.003.223.006.434.02 1.034.086 1.7.271 1.326.368 2.896 1.202 3.94 3.08a.5.5 0 0 0 .933-.305c-.464-3.71-1.886-5.662-3.46-6.66-1.245-.79-2.527-.942-3.336-.971v-.66a1.144 1.144 0 0 0-1.767-.96l-3.994 2.94a1.147 1.147 0 0 0 0 1.946l3.994 2.94a1.144 1.144 0 0 0 1.767-.96v-.667z"
                    />
                  </svg>
                </div>

                <strong class="me-auto">{{ list.uname }}</strong>
                <small>{{ list.rcreate_date }}</small>
                <button
                  v-if="list.uno == this.user.uno"
                  type="button"
                  class="btn-close"
                  aria-label="Close"
                  @click="replyDelete(list.rno)"
                ></button>
              </div>
              <div class="toast-body text-start border-top">
                {{ list.rcontent }}
              </div>
            </div>
            <div class="d-flex justify-content-end mt-1">
              <button
                type="button"
                class="btn btn-sm btn-outline-primary rounded-2"
                @click="replyFromReplyCreate(list)"
              >
                답글
              </button>
            </div>
            <!-- 대댓글작성 -->
            <div :id="list.rno" style="display: none">
              <component
                :is="replyFormAdd"
                :replyList="list"
                :id="`reply${list.rno}`"
              ></component>
            </div>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import NewReplyForm from "./NewReplyForm.vue";
export default {
  components: { NewReplyForm },
  data() {
    return {
      replyList: {},
      rcontent: "",
      bno: "",
      replyFormAdd: "",
      sty: [
        {
          "margin-left": "0px",
        },
      ],
    };
  },

  props: {
    reply: {
      type: Object,
    },
  },
  computed: {
    //값이 바뀔대마다 적용.
    user() {
      return this.$store.state.user;
    },
  },
  mounted() {
    // if (this.user.email == undefined) {
    //   alert("로그인 후 이용해주세요.");
    //   this.$router.push({ path: "/boardList" });
    // }
  },
  created() {
    this.bno = this.$route.query.bno;
    this.getReplyList();
  },
  methods: {
    async getReplyList() {
      this.replyList = await this.$api("/api/boardReplyList", {
        param: [this.bno],
      });

      this.replyList.forEach((elm) => {
        let depth = elm.rdepth;
        if (!this.sty[depth]) {
          let data = { "margin-left": depth * 10 + "px" };
          this.sty.push(data);
        }
      });
    },

    replyFromReplyCreate(list) {
      this.replyFormAdd = "NewReplyForm"; //컴포넌트 보이게.
      document.getElementById(list.rno).removeAttribute;
      document.getElementById(list.rno).setAttribute("style", "display:block");
      //console.log(list);
    },

    async newReply() {
      if (!this.rcontent) {
        this.$swal.fire("내용을 입력해주세요");
      } else {
        this.$swal
          .fire({
            title: "저장하시겠습니까?",
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "네",
            denyButtonText: `아니오`,
          })
          .then(async (result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              // let replyCreate =
              await this.$api("/api/boardNewReply", {
                param: [this.rcontent, this.user.uno, this.bno],
              });
              // let sortUpdate =
              await this.$api("/api/boardReplySortUpdate", {
                param: [this.bno],
              });
              this.getReplyList();
              this.rcontent = "";

              this.$swal.fire("성공", "", "success");
            } else if (result.isDenied) {
              this.$swal.fire("저장되지 않았습니다.", "", "info");
            }
          });
      }
    },

    replyDelete(rno) {
      if (!rno) {
        this.rcontent = "";
      } else {
        this.$swal
          .fire({
            title: "정말 삭제하시겠습니까?",
            showCancelButton: true,
            confirmButtonText: "네, 삭제합니다.",
            cancelButtonText: "아니요, 삭제하지 않습니다.",
          })
          .then(async (result) => {
            if (result.isConfirmed) {
              await this.$api("/api/replyDelete", {
                param: [rno],
              });
              this.$swal.fire("삭제 되었습니다.", "", "info");

              this.getReplyList();
            }
          });
      }
    },
  },
};
</script>
