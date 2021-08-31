function generateRandomIntegerLessThan(excludedMaxValue) {
    return Math.floor(Math.random() * excludedMaxValue)
}

class WordSelector {

    constructor(datasource) {
        this.datasource = datasource
    }

    select() {
        const numberOfWords = this.datasource.getNumberOfWords();
        const wordIndex = generateRandomIntegerLessThan(numberOfWords)
        const word = this.datasource.getWord(wordIndex)
        return {
            article: '', // TODO return word class object
            german: word.german,
            english: word.english,
        }
    }
}

module.exports = WordSelector