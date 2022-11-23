let username = '6F0D142D6C99'
let password = '40A62A927299'
let baseUrl = `http://procdn.cx/player_api.php?username=${username}&password=${password}`
const playableBase = `http://procdn.cx/${username}/${password}`

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