export const state = () => ({
    counter: 0,
    currentBlog: {
        totalScroll: 0,
        progress: 0
    },
})

export const getters = {
    getCurrentBlogTotalScroll: state => {
        return state.currentBlog.totalScroll;
    },
    getCurrentBlogProgress: state => {
        return state.currentBlog.progress;
    }
}

export const actions = {

}

export const mutations = {
    setCurrentBlogTotalScroll(state, payload) {
        state.currentBlog.totalScroll = payload.totalScroll
    },
    setCurrentBlogProgress(state, payload) {
        state.currentBlog.progress = payload.progress
    }
}
