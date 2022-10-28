let username = 'c55e3db501'
let password = 'f6fc89dd50'
let baseUrl = `http://line.premium-dino.com/player_api.php?username=${username}&password=${password}`
const playableBase = `http://line.premium-dino.com/${username}/${password}`

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