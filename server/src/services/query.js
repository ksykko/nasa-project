const DEFAULT_PAGE_NUMBER = 1
const DEFAULT_PAGE_LIMIT = 0

function getPagination(query) {
    const page = Math.abs(query.page) || DEFAULT_PAGE_NUMBER // page number
    const limit = Math.abs(query.limit) || DEFAULT_PAGE_LIMIT // limit results per page
    const skip = (page - 1) * limit // skip previous pages

    return {
        skip,
        limit
    }
}

module.exports = {
    getPagination
}