<template>
  <main class="mt-3">
    <div class="container">
      <div
        class="d-md-flex flex-md-row-reverse align-items-center justify-content-between"
      >
        <button
          type="button"
          class="btn btn-sm btn-outline-primary mb-3 rounded-2"
          @click="boardCreate"
        >
          글쓰기
        </button>
      </div>
      <div class="table-responsive">
        <table class="table">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">제목</th>
              <th scope="col">작성자</th>
              <th scope="col">업데이트</th>
              <th scope="col">조회수</th>
            </tr>
          </thead>
          <tbody>
            <tr :key="i" v-for="(list, i) in boardList">
              <th scope="row">{{ list.bno }}</th>
              <td @click="goToDetail(list.bno, list.bhit)">
                <a href="#" class="link-secondary">{{ list.btitle }}</a>
              </td>
              <td>{{ list.uname }}</td>
              <td v-if="list.bupdate_date != null">{{ list.bupdate_date }}</td>
              <td v-if="list.bupdate_date == null">{{ list.bcreate_date }}</td>
              <td>{{ list.bhit }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  data() {
    return {
      bhit: 0,
      boardList: [],
      searchTxt: "",
    };
  },
  created() {
    this.searchTxt = this.$route.query.btitle;
    this.getBoardSearchList();
  },
  methods: {
    async getBoardSearchList() {
      this.boardList = await this.$api("/api/boardSearchList", {
        param: [this.searchTxt],
      });
      console.log("??", this.boardList);
    },
    goToDetail(bno, bhit) {
      this.getBoardDetailHit(bno, bhit + 1).then(() => {
        this.$router.push({
          path: "boardDetail",
          query: { bno: bno },
        });
      });
    },

    async getBoardDetailHit(bno, bhit) {
      await this.$api("/api/boardDetailHit", {
        param: [bhit, bno],
      });
    },

    boardCreate() {
      this.$router.push({
        path: "boardCreate",
      });
    },
  },
};
</script>
