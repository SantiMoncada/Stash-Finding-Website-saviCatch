const axios = require('axios')

class TrivialService {

    constructor() {
        this.api = axios.create({
            baseURL: 'https://opentdb.com'
        })

    }

    getRandomTrivial(number = 1) {
        return this.api.get(`/api.php?amount=${number}`)
    }

    getCategories() {
        return this.api.get('/api_category.php')
    }
}

module.exports = new TrivialService()
