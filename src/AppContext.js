const WordRepository = require('./WordRepository')
const WordSelector = require('./WordSelector')
const SlackNotifier = require('./SlackNotifier')

class AppContext {
    constructor() {
        this.wordRepository = WordRepository.loadFromFolder('./resources/words')
        this.wordSelector = new WordSelector(this.wordRepository)
        this.slackNotifier = new SlackNotifier(this.wordSelector)
    }
}

module.exports = AppContext