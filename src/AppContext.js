const words = require('../resources/words')
const WordGenerator = require('./WordGenerator')
const SlackNotifier = require('./SlackNotifier')

class AppContext {
    constructor() {
        this.words = words
        this.wordGenerator = new WordGenerator(this.words)
        this.slackNotifier = new SlackNotifier(this.wordGenerator)
    }
}

module.exports = AppContext