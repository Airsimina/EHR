export default {
    setLoading: (state, value) => {
        state.loading = value
    },
    setInfoDataList: (state, value) => {
        state.infoDataList = value
    },
    setInfoData: (state, value) => {
        state.infoData = value
    },

    addLoading: (state, value) => {
        state.isShowLoading = value
        state.loadingCount++
    },
    isCloseLoading: (state, value) => {
        state.loadingCount--
        if (state.loadingCount == 0) {
            state.isShowLoading = false
        }
    }
}