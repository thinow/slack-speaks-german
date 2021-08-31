const Word = require('./Word')

class WordRepository {
    static loadFromFolder(folder) {
        return new WordRepository()
    }

    getNumberOfWords() {
        return 0
    }

    getWord(index) {
        return new Word('das Wort, -"er', 'word')
    }
}

module.exports = WordRepository