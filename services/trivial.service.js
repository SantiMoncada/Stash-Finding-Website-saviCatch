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

    getCustomTrivial(setting) {
        setting = setting ? setting : {};
        const amount = setting.amount ? setting.amount : 1;
        const category = setting.category ? setting.category : 9;
        const difficulty = setting.difficulty ? setting.difficulty : "easy";

        console.log("end")

        let amountString = ''
        let categoryString = ''
        let difficultyString = ''
        let typeString = `&type=multiple`

        if (amount) {
            amountString = `amount=${amount}`
        }
        if (category) {
            categoryString = `&category=${category}`
        }
        if (difficulty) {
            difficultyString = `&difficulty=${difficulty}`
        }

        console.log(`/api.php?${amountString}${categoryString}${difficultyString}${typeString}`)
        return this.api.get(`/api.php?${amountString}${categoryString}${difficultyString}${typeString}`)

    }
}

module.exports = new TrivialService()
