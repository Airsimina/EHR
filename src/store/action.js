export default {
    async setMyNumber ({
        commit,
        state
    }, payload) {
        commit('setMyNumber', payload)
    }
}