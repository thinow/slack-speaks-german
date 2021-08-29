const Datasource = require('./Datasource')
const WordGenerator = require('./WordGenerator')
const SlackNotifier = require('./SlackNotifier')

class AppContext {
    constructor() {
        this.datasource = Datasource.loadFromFolder('./resources/words')
        this.wordGenerator = new WordGenerator(this.datasource)
        this.slackNotifier = new SlackNotifier(this.wordGenerator)
    }
}

module.exports = AppContext