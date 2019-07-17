export const state = () => ({
    counter: 0,
    blogPosts: process.env.blogPosts
})

export const mutations = {
    increment(state) {
        state.counter++
    }
}