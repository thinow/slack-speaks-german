const DEFAULT_OPTS = {
    minLength: 4,
    maxLength: 16
}

const mergeWithDefaults = opts => {
    return Object.assign({}, DEFAULT_OPTS, opts)
}

const REGEXP_GERMAN_WORDS = new RegExp(/^[a-zäöüß]+$/, 'i')
const validGermanWords = word => REGEXP_GERMAN_WORDS.test(word);

const withLength = (min, max) => word => {
    const length = word.length
    return min <= length && length <= max
}

const pickRandomly = array => {
    return array[Math.floor(Math.random() * array.length)]
}

class WordGenerator {

    constructor(words) {
        if (!words || !words.length) {
            throw new Error('the argument `words` is missing or empty')
        }

        this.words = words
    }

    generate(opts) {
        const {minLength, maxLength} = mergeWithDefaults(opts)

        const filtered = this.words
            .filter(validGermanWords)
            .filter(withLength(minLength, maxLength))

        return pickRandomly(filtered)
    }
}

module.exports = WordGenerator