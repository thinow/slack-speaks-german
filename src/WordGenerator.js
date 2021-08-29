class WordGenerator {

    constructor(datasource) {
        this.datasource = datasource
    }

    generate() {
        const wordIndex = this.generateWordIndex()
        const word = this.datasource.getWord(wordIndex)
        return {
            article: '', // TODO return word class object
            german: word.german,
            english: word.english,
        }
    }

    generateWordIndex() {
        const numberOfWords = this.datasource.getNumberOfWords()
        return Math.floor(Math.random() * numberOfWords)
    }
}

module.exports = WordGenerator