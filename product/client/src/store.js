//글로벌로 상태관리, 데이터 관리가 필요한 것을 등록하는 용도
import { createStore } from "vuex";
import persistedstate from "vuex-persistedstate";

const store = createStore({
  state() {
    return {
      user: {},
    };
  },
  mutations: {
    user(state, data) {
      state.user = data;
    },
  },
  plugins: [
    //화면 리프레시 되어도 세션 안날라감
    persistedstate({
      paths: ["user"],
    }),
  ],
});

export default store;
