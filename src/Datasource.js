const Word = require('./Word')

class Datasource {
    static loadFromFolder(folder) {
        return new Datasource()
    }

    getNumberOfWords() {
        return 0
    }

    getWord(index) {
        return new Word('das Wort, -"er', 'word')
    }
}

module.exports = Datasource