const { get } = require("../service/axios_client")
const { categoryUrl, liveByCategoryUrl } = require("../service/url.service")

exports.categoryList = async () => {
    try {
        const catUrl = categoryUrl()
        const categoryData = await get(catUrl);
        return categoryData ? categoryData : false
    } catch (error) {
        return false
    }
}

exports.liveByCategory = async (categoryId) => {
    try {
        const categoryUrl = liveByCategoryUrl(categoryId);
        const categoryData = await get(categoryUrl);
        return categoryData ? categoryData : false
    } catch (error) {
        return false
    }
}
