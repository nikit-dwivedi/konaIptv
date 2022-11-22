let username = 'sMEbKDAmZAQrT2d'
let password = 'lyyIKnBdDpqDcCM'
let baseUrl = `http://line.ottcst.com:80/player_api.php?username=${username}&password=${password}`
const playableBase = `http://line.ottcst.com:80/${username}/${password}`

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