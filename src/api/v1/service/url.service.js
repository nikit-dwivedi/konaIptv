let baseUrl = "http://line.premium-dino.com/player_api.php?username=aaccdfdef8&password=669f067695"

module.exports = {
    categoryUrl: () => {
        return baseUrl + '&action=get_live_categories'
    },
    liveByCategoryUrl: (categoryId) => {
        return baseUrl + `&action=get_live_streams&category_id=${categoryId}`
    }
}