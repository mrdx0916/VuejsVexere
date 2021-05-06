import api from "../../api";
import * as types from "./constant";
const state = {
    loading:false,
    companyDetail:null,
    error:null,
};

const mutations = {
    [types.M_COMPANY_REQUEST]:(state) => {
        state.loading = true;
        state.companyDetail = null;
        state.error=null;
    },
    [types.M_COMPANY_SUCCESS]:(state,payload) => {
        state.loading = false;
        state.companyDetail = payload;
        state.error=null;
    },
    [types.M_COMPANY_ERROR]:(state,payload) => {
        state.loading = true;
        state.companyDetail = null;
        state.error=payload;
    }
};

const actions = {
    [types.A_GET_COMPANY]: ({commit},data) => {
        commit(types.M_COMPANY_REQUEST);
        api.get(`/company?_id=${data}`).then((result) => {
            commit(types.M_COMPANY_SUCCESS,result.data);
        }).catch((err) => {
            commit(types.M_COMPANY_ERROR,err.response.data.message);
        })
    }
};

const getters = {
    companyLoading:(state) => {
        return state.loading;
    },
    companyDetail:(state) => {
        return state.companyDetail;
    },
    companyError:(state) => {
        return state.error;
    },
}

export default {
    state,mutations,actions,getters
}