/***
 *  vuex 模块 created by lcx
 */

const market = {
    namespaced: true,
    state: {
        myPersion: 'xxinso'
    },
    mutations: {
        CHANGE_PERSION: (state, persion) => {
            state.myPersion = persion
        }
    },
    getters: {
        GET_PERSION: (state, getters) => {
            return state.myPersion
        }
    }
}

export default market