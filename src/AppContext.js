const WordRepository = require('./WordRepository')
const WordSelector = require('./WordSelector')
const SlackNotifier = require('./SlackNotifier')

class AppContext {
    constructor(event) {
        const folder = event.wordsFolder || './resources/words'
        this.wordRepository = WordRepository.loadFromFolder(folder)
        this.wordSelector = new WordSelector(this.wordRepository)
        this.slackNotifier = new SlackNotifier(this.wordSelector)
    }
}

module.exports = AppContext