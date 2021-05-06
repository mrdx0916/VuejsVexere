import api from "../../api/index";
import router from "../../router/index";
import setHeaders from "../../Utils/setHeader";
import * as types from "./constant";

const state = {
  loading: false,
  err: null,
  token: null,
};
const mutations = {
  [types.M_SIGNIN_REQUEST]: (state) => {
    state.loading = true;
    state.err = null;
    state.token = null;
  },

  [types.M_SIGNIN_SUCCESS]: (state, payload) => {
    state.loading = false;
    state.err = null;
    state.token = payload;
  },

  [types.M_SIGNIN_FAILED]: (state, payload) => {
    state.loading = false;
    state.err = payload;
    state.token = null;
  },
  [types.M_SIGNIN_CLEAR]: (state) => {
    state.loading = false;
    state.err = null;
    state.token = null;
  },
};
const actions = {
  [types.A_SIGNIN_APP]: ({ commit }, form) => {
    commit(types.M_SIGNIN_REQUEST);
    api
      .post("/signin", form)
      .then((result) => {
        commit(types.M_SIGNIN_SUCCESS, result.data);
        localStorage.setItem("token", result.data);
        setHeaders(result.data);
        router.replace("/");
      })
      .catch((err) => {
        commit(types.M_SIGNIN_FAILED, err);
        alert(err.response.data.message);
      });
  },
  [types.A_TRY_SIGNIN]: ({ commit }) => {
    const token = localStorage.getItem("token");
    if (!token) {
      return;
    }
    setHeaders(token);
    commit(types.M_SIGNIN_SUCCESS, token);
  },
  [types.A_SIGN_OUT]: ({ commit }) => {
    localStorage.removeItem("token");
    commit(types.M_SIGNIN_CLEAR);
  }
};
const getters = {
  loadingAuth: (state) => {
    return state.loading;
  },
  errAuth: (state) => {
    return state.err;
  },
};

export default {
  state,
  mutations,
  actions,
  getters,
};
