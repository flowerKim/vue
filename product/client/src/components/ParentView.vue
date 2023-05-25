<template>
  <div>
    <!-- <h1>{{ title }}</h1> -->

    <button type="button" @click="clickReply()">눌렀을때</button>
    <!-- <div :v-show="buttons">
      <ChildCompoent :title="title" :replyList="replyList"></ChildCompoent>
    </div> -->

    <component :is="currentContent" :replyList="replyList"></component>
  </div>
</template>
<script>
import ChildCompoent from "../views/ChildView.vue";

// const contentOne = {
//   template: `<button>나와라</button>`,
// };

export default {
  components: { ChildCompoent },
  data() {
    return {
      title: "234356yegfASdfasdfasdfsdf",
      replyList: {
        rno: "10006",
        rcontent: "srfgthuewirfajkdmls",
        rdepth: "1",
        rpno: "1",
        rcreate_date: "2023-05-19T00:39:30.000Z",
        uno: "1",
        uname: "admin",
        bno: "6",
        sort: "10001_1",
        sort2: "1",
      },

      currentContent: "",
      buttons: "",
    };
  },
  // props: {
  //   //데이터 던져줌
  //   title: {
  //     type: String,
  //     default: "페이지 타이틀 입니다.",
  //   },
  // },
  methods: {
    clickReply() {
      this.currentContent = "ChildCompoent";
    },
  },
};
</script>
