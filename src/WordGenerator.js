class WordGenerator {

    constructor(words) {
        if (!words || !words.length) {
            throw new Error('the argument `words` is missing or empty')
        }

        this.words = words
    }

    generate() {
        return WordGenerator.pickRandomly(this.words)
    }

    static pickRandomly(array) {
        return array[Math.floor(Math.random() * array.length)]
    }
}

module.exports = WordGenerator