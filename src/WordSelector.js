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
        const word = this.wordRepository.getWord(wordIndex)
        return {
            article: '', // TODO return word class object
            german: word.german,
            english: word.english,
        }
    }
}

module.exports = WordSelector