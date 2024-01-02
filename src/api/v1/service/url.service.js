let username = ''
let password = ''
let baseUrl = ``
const playableBase = ``

module.exports = {
    categoryUrl: () => {
        return baseUrl + '&action=get_live_categories'
    },
    liveByCategoryUrl: (categoryId) => {
        return baseUrl + `&action=get_live_streams&category_id=${categoryId}`
    },
    livePlayableUrl: (stream_id) => {
        return playableBase + `/${stream_id}`
    }
}