import api from "../../api";
import router from "../../router";
import * as Types from "./constant";
import Swal from "sweetalert2";
const state = {
    profile: null,
};
const mutations = {
    [Types.M_PROFILE]: (state, payload) => {
        state.profile = payload;
    },
    [Types.M_REMOVE_PROFILE]: (state) => {
        state.profile = null;
    }
};
const actions = {
    [Types.A_FETCH_PROFILE]: ({ commit }) => {
        api.get("/profile").then((res) => {
            commit(Types.M_PROFILE, res.data);
        }).catch((err) => {
            if (err.response.data.err.name === "TokenExpiredError") {
                Swal.fire({
                    text: "Lượt đăng nhập của bạn đã hết hạn , vui lòng đăng nhập lại:",
                    icon: "warning",
                    showCancelButton: true,
                    confirmButtonColor: "#3085d6",
                    cancelButtonColor: "#d33",
                    confirmButtonText: "Sign in",
                }).then((result) => {
                    if (result.isConfirmed) {
                        router.push("/signin");
                    }
                });
                commit(Types.M_REMOVE_PROFILE);
                localStorage.removeItem("token");
                router.replace("/signin");
            }
        })
    },
    [Types.A_REMOVE_PROFILE]: ({ commit }) => {
        commit(Types.M_REMOVE_PROFILE);
    }
};
const getters = {
    profile: (state) => {
        return state.profile;
    }
}

export default {
    state, mutations, actions, getters,
}