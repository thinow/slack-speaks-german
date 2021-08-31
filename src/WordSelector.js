function generateRandomIntegerLessThan(excludedMaxValue) {
    return Math.floor(Math.random() * excludedMaxValue)
}

class WordSelector {

    constructor(WordRepository) {
        this.wordRepository = WordRepository
    }

    async select() {
        const numberOfWords = this.wordRepository.getNumberOfWords();
        const wordIndex = generateRandomIntegerLessThan(numberOfWords)
        return await this.wordRepository.getWord(wordIndex)
    }
}

module.exports = WordSelector