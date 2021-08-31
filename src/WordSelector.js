function generateRandomIntegerLessThan(excludedMaxValue) {
    return Math.floor(Math.random() * excludedMaxValue)
}

class WordSelector {

    constructor(WordRepository) {
        this.wordRepository = WordRepository
    }

    select() {
        const numberOfWords = this.wordRepository.getNumberOfWords();
        const wordIndex = generateRandomIntegerLessThan(numberOfWords)
        return this.wordRepository.getWord(wordIndex)
    }
}

module.exports = WordSelector