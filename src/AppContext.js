const Datasource = require('./Datasource')
const WordSelector = require('./WordSelector')
const SlackNotifier = require('./SlackNotifier')

class AppContext {
    constructor() {
        this.datasource = Datasource.loadFromFolder('./resources/words')
        this.wordSelector = new WordSelector(this.datasource)
        this.slackNotifier = new SlackNotifier(this.wordSelector)
    }
}

module.exports = AppContext