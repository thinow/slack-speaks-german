const WordGenerator = require('../src/WordGenerator')

describe('when trying to instantiate with undefined words', () => {
    it('should raise an error', () => {
        expect(() => new WordGenerator(undefined))
            .toThrow('the argument `words` is missing or empty')
    })
})

describe('when trying to instantiate with empty words', () => {
    it('should raise an error', () => {
        expect(() => new WordGenerator([]))
            .toThrow('the argument `words` is missing or empty')
    })
})

describe('when generating a word', () => {
    it('should pick a value from given words', () => {
        // given
        const words = ['Wort']

        // when
        const word = new WordGenerator(words).generate()

        // then
        expect(word).toEqual('Wort')
    })
})

describe('when specifying size of the word', () => {
    it('should return a word of the good size', () => {
        // given
        const words = [
            'AB',   // too short
            'ABC',  // valid
            'ABCD'  // too long
        ]

        // when
        const word = new WordGenerator(words).generate({
            minLength: 3,
            maxLength: 3
        })

        // then
        expect(word).toEqual('ABC')
    })
})

describe('when specifying size of the word', () => {
    it('should return a word of the good size', () => {
        // given
        const words = [
            '',
            'With-Dash',
            'WithDigit1',
            'WithNotGermanAccénts',
            'Sentence made for several word',
            'Valid'
        ]

        // when
        const word = new WordGenerator(words).generate()

        // then
        expect(word).toEqual('Valid')
    })
})
describe('when the words are valid German words', () => {
    const shouldBeAbleToGenerate = word => {
        it(`should be able to generate ${word}`, () => {
            expect(new WordGenerator([word]).generate()).toEqual(word)
        })
    }

    shouldBeAbleToGenerate('Tisch')
    shouldBeAbleToGenerate('Straße')
    shouldBeAbleToGenerate('Säule')
    shouldBeAbleToGenerate('Wörter')
    shouldBeAbleToGenerate('Schütze')
    shouldBeAbleToGenerate('Österreich')
})
