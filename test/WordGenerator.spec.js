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
