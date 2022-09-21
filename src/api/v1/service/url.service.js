let baseUrl = "http://line.premium-dino.com/player_api.php?username=ff5d039692&password=1384c85f6b"

module.exports = {
    categoryUrl: () => {
        return baseUrl + '&action=get_live_categories'
    },
    liveByCategoryUrl: (categoryId) => {
        return baseUrl + `&action=get_live_streams&category_id=${categoryId}`
    }
}