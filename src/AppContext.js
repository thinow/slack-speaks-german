const words = require('all-the-german-words')
const WordGenerator = require('./WordGenerator')
const SlackNotifier = require('./SlackNotifier')

class AppContext {

    static init() {
        AppContext.wordGenerator = new WordGenerator(words)
        AppContext.slackNotifier = new SlackNotifier(AppContext.wordGenerator)
    }
}

module.exports = AppContext